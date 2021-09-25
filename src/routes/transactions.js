import { Router } from "express";
import Transactions from "../controllers/transactions";
import { isNormalUser } from "../middlewares/access";
import { validatePayoutRequest } from "../middlewares/validation/transactions";

const router = Router();
const transactions = new Transactions();

router.get("/", isNormalUser, transactions.get);
router.post(
  "/payout",
  isNormalUser,
  validatePayoutRequest,
  transactions.ravePayoutTransfer
);

export default router;

