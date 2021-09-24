import { Router } from "express";
import { isNormalUser } from "../middlewares/access";
import WalletController from "../controllers/wallets";

const router = new Router();
const walletController = new WalletController();

router.get("/", isNormalUser, walletController.get);

export default router;
