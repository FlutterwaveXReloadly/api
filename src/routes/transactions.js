import { Router } from "express";
import Transactions from "../controllers/transactions";
import { isNormalUser, isAdmin } from "../middlewares/access";
import {
  validatePayoutRequest,
  validateTopupRequest,
  validateOrderGiftCard,
} from "../middlewares/validation/transactions";

const router = Router();
const transactions = new Transactions();

router.get("/", isNormalUser, transactions.get);
router.post(
  "/payout",
  isNormalUser,
  validatePayoutRequest,
  transactions.ravePayoutTransfer
);

router.post(
  "/topup",
  isNormalUser,
  validateTopupRequest,
  transactions.reloadlyTopup
);

router.get("/countries", transactions.getCountries);
router.put("/products/sync", isAdmin, transactions.syncProducts);
router.get("/products/search", isNormalUser, transactions.searchProducts);
router.post(
  "/giftcards/order",
  isNormalUser,
  validateOrderGiftCard,
  transactions.orderGiftCard
);
router.get("/giftcards/redeem/:transactionId", isNormalUser, transactions.redeemCode);
export default router;
