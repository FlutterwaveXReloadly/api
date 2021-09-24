import { Router } from "express";
import Transactions from "../controllers/transactions";
import { isNormalUser } from "../middlewares/access";

const router = Router();
const transactions = new Transactions();

router.get("/", isNormalUser, transactions.get);

export default router;

