import { v4 } from "uuid";

import TransactionService from "../DB/services/transactions";
import UserService from "../DB/services/user";
import WalletService from "../DB/services/wallets";
import ProductService from "../DB/services/products";

import out from "../helpers/out";
import { get, set } from "../helpers/redis";
import { transfers } from "../helpers/rave";
import {
  airtimeTopup,
  getProducts,
  detectOperator,
  getCountry,
  orderGiftCard,
  getredeemCode,
} from "../helpers/reloadly";
import { convert } from "../helpers/currency";

const transactionService = new TransactionService();
const userService = new UserService();
const walletService = new WalletService();
const productService = new ProductService();

export default class Transactions {
  async get(req, res) {
    try {
      const cache = await get(`trans-user-${req.user}`);
      if (cache) {
        return out(res, cache, 200, "Transactions found", undefined);
      }
      const transactions = await transactionService.get({ user: req.user });
      if (transactions.length > 0) {
        await set(`trans-user-${req.user}`, transactions);
        return out(res, transactions, 200, "Transactions found", undefined);
      }
      return out(res, transactions, 404, "Transactions not found", "CTR0-0");
    } catch (error) {
      console.log(error);
      return out(res, undefined, 500, "Internal server error", "CTR0-1");
    }
  }

  async ravePayoutTransfer(req, res) {
    try {
      const user = await userService.get({ _id: req.user });
      if (user.length === 0) {
        return out(res, undefined, 400, "Something went wrong", "CTR1-0");
      }
      const wallet = await walletService.getWallets({ user: req.user });
      if (wallet.length === 0) {
        return out(res, undefined, 400, "Something went wrong", "CTR1-1");
      }
      if (wallet[0].amount < req.body.amount) {
        return out(res, undefined, 400, "Insufficient funds", "CTR1-2");
      }
      const reference = v4();
      const transfer = await transfers({
        account_bank: user[0].bankDetails.bankId,
        account_number: user[0].bankDetails.accountNumber,
        amount: req.body.amount,
        narration: "WorkHaus payout",
        reference,
        currency: "USD",
        callback_url: "https://google.com",
        beneficiary_name: user[0].names,
      });
      console.log(transfer);
      if (transfer.status !== "success") {
        return out(res, undefined, 400, "Something went wrong", "CTR1-3");
      }
      const transaction = await transactionService.add({
        user: req.user,
        amount: req.body.amount,
        type: "credit-payout",
        reference: `${transfer.data.id}-${reference}`,
      });
      if (!transaction) {
        return out(res, undefined, 400, "Something went wrong", "CTR1-4");
      }
      const updateWallet = await walletService.updateWallet(
        { user: req.user },
        {
          amount: wallet[0].amount - req.body.amount,
        }
      );
      if (updateWallet.modifiedCount === 0) {
        return out(res, undefined, 400, "Something went wrong", "CTR1-5");
      }
      return out(res, transaction, 200, "Transaction successful", undefined);
    } catch (error) {
      console.log(error);
      return out(res, undefined, 500, "Internal server error", "CTR1-6");
    }
  }

  async reloadlyTopup(req, res) {
    try {
      const { amount, number, country } = req.body;
      const { operatorId, destinationCurrencyCode } = await detectOperator(
        number,
        country
      );
      if (operatorId === null) {
        return out(res, undefined, 400, "Invalid number", "CTR2-0");
      }
      const user = await userService.get({ _id: req.user });
      if (user.length === 0) {
        return out(res, undefined, 400, "Something went wrong", "CTR2-1");
      }
      const wallet = await walletService.getWallets({ user: req.user });
      if (wallet.length === 0) {
        return out(res, undefined, 400, "Something went wrong", "CTR2-2");
      }
      if (wallet[0].amount < amount) {
        return out(res, undefined, 400, "Insufficient funds", "CTR2-3");
      }
      const conversionRate = await convert("USD", destinationCurrencyCode);
      const chargeableAmount =
        amount * conversionRate[`USD_${destinationCurrencyCode}`];
      const topup = await airtimeTopup(
        operatorId,
        chargeableAmount,
        {
          countryCode: country,
          number: number,
        },
        {
          number: user[0].phoneNumber,
          countryCode: user[0].country,
        }
      );
      if (topup.errorCode || topup.errorCode === null) {
        console.log(topup.errorCode);
        return out(res, undefined, 400, "Something went wrong", "CTR2-4");
      }
      const transaction = await transactionService.add({
        user: req.user,
        amount,
        type: "credit-topup",
        reference: topup.transactionId,
      });
      if (!transaction) {
        return out(res, undefined, 400, "Something went wrong", "CTR2-5");
      }
      const updateWallet = await walletService.updateWallet(
        { user: req.user },
        { amount: wallet[0].amount - amount }
      );
      console.log(updateWallet);
      if (updateWallet.modifiedCount === 0) {
        return out(res, undefined, 400, "Something went wrong", "CTR2-6");
      }
      return out(res, transaction, 200, "Transaction successful", undefined);
    } catch (error) {
      console.log(error);
      return out(res, undefined, 500, "Internal server error", "CTR2-7");
    }
  }
  async getCountries(req, res) {
    try {
      const cache = await get("countries");
      if (cache) {
        return out(res, cache, 200, "Countries found", undefined);
      }
      const countries = await getCountry();
      if (countries === null) {
        return out(res, countries, 404, "Countries not found", "CTR3-0");
      }
      await set("countries", countries);
      return out(res, countries, 200, "Countries found", undefined);
    } catch (err) {
      console.log(err);
      return out(res, undefined, 500, "Internal server error", "CTR3-1");
    }
  }

  async syncProducts(req, res) {
    try {
      const products = await getProducts();
      if (products === null) {
        return out(res, products, 404, "Products not found", "CTR4-0");
      }
      products.forEach(async (product) => {
        const upsert = await productService.upsert(
          { productId: product.productId },
          product
        );
        if (upsert.upsertedCount === 0) {
          return out(res, undefined, 400, "Something went wrong", "CTR4-1");
        }
      });
      return out(res, products, 200, "Products found", undefined);
    } catch (error) {
      console.log(error);
      return out(res, undefined, 500, "Internal server error", "CTR4-2");
    }
  }

  async searchProducts(req, res) {
    try {
      const { q } = req.query;
      const query = { $text: { $search: q } };
      const cache = await get(`search-products-${q}`);
      if (cache) {
        return out(res, cache, 200, "Products found", undefined);
      }
      const products = await productService.search(query);
      if (products.length === 0) {
        return out(res, undefined, 404, "Products not found", "CTR5-0");
      }
      await set(`search-products-${q}`, products);
      return out(res, products, 200, "Products found", undefined);
    } catch (error) {
      console.log(error);
      return out(res, undefined, 500, "Internal server error", "CTR5-1");
    }
  }

  async orderGiftCard(req, res) {
    try {
      const { denomination, productId, quantity } = req.body;
      const customIdentifier = v4();
      const product = await productService.search({ productId });
      if (product.length === 0) {
        return out(res, undefined, 404, "Product not found", "CTR6-0");
      }
      const wallet = await walletService.getWallets({ user: req.user });
      if (wallet.length === 0) {
        return out(res, undefined, 404, "Wallet not found", "CTR6-1");
      }
      const unitPrice =
        product[0].denominationType === "FIXED"
          ? product[0].fixedRecipientDenominations[denomination]
          : product[0].minReciepientDenominations[denomination];
      const conversionRate = await convert(
        product[0].recipientCurrencyCode,
        "USD"
      );
      const amount =
        quantity *
        unitPrice *
        conversionRate[`${product[0].recipientCurrencyCode}_USD`];
      if (wallet[0].amount < amount) {
        return out(res, undefined, 400, "Insufficient funds", "CTR6-2");
      }
      const user = await userService.get({ _id: req.user });
      const order = await orderGiftCard(
        product[0].productId,
        unitPrice,
        quantity,
        customIdentifier,
        user[0].email,
        user[0].names
      );
      if (order === null) {
        return out(res, undefined, 400, "Something went wrong", "CTR6-2");
      }
      const transaction = await transactionService.add({
        user: req.user,
        amount,
        type: "credit-gift-card",
        reference: order.transactionId,
      });
      if (!transaction) {
        return out(res, undefined, 400, "Something went wrong", "CTR6-3");
      }
      const updateWallet = await walletService.updateWallet(
        { user: req.user },
        { amount: wallet[0].amount - amount }
      );
      if (updateWallet.modifiedCount === 0) {
        return out(res, undefined, 400, "Something went wrong", "CTR6-4");
      }
      return out(res, order, 200, "Order successful", undefined);
    } catch (err) {
      console.log(err);
      return out(res, undefined, 500, "Internal server error", "CTR6-5");
    }
  }

  async redeemCode(req, res) {
    try {
      const { transactionId } = req.params;
      const redeemCode = await getredeemCode(Number(transactionId));
      if (redeemCode === null) {
        return out(res, undefined, 404, "Redeem code not found", "CTR7-0");
      }
      return out(res, redeemCode, 200, "Redeem code found", undefined);
    } catch (err) {
      console.log(err);
      return out(res, undefined, 500, "Internal server error", "CTR7-1");
    }
  }
}
