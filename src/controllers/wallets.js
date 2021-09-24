import WalletService from "../DB/services/wallets";
import out from "../helpers/out";
import { get, set } from "../helpers/redis";

const walletService = new WalletService();

export default class Wallet {
  async get(req, res) {
    try {
      const cache = await get(`wallet-user-${req.user}`);
      if (cache) {
        return out(res, cache, 200, "Transactions found", undefined);
      }
      const wallet = await walletService.getWallets({ user: req.user });
      if (wallet.length === 1) {
        await set(`wallet-user-${req.user}`, wallet);
        return out(res, wallet, 200, "Wallet information found", undefined);
      }
      return out(res, undefined, 404, "Wallet information not found", "CW0-0");
    } catch (error) {
      console.log(error);
      return out(res, undefined, 500, "Internal server error", "CW0-1");
    }
  }
}
