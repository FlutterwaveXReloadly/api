import TransactionService from "../DB/services/transactions";
import out from "../helpers/out";
import { get, set } from "../helpers/redis";

const transactionService = new TransactionService();
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
}
