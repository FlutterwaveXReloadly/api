import { v4 } from "uuid";

import TransactionService from "../DB/services/transactions";
import UserService from "../DB/services/user";
import WalletService from "../DB/services/wallets";

import out from "../helpers/out";
import { get, set } from "../helpers/redis";
import { transfers } from "../helpers/rave";

const transactionService = new TransactionService();
const userService = new UserService();
const walletService = new WalletService();

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
        callback_url: 'https://google.com',
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
      const updateWallet = await walletService.updateWallet({ user: req.user }, {
        amount: wallet[0].amount - req.body.amount,
      });
      if (updateWallet.modifiedCount === 0) {
        return out(res, undefined, 400, "Something went wrong", "CTR1-5");
      }
      return out(res, transaction, 200, "Transaction successful", undefined);
    } catch (error) {
      console.log(error);
      return out(res, undefined, 500, "Internal server error", "CTR1-6");
    }
  }
}
