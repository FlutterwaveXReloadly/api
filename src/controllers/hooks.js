import out from "../helpers/out";
import { transVerify, verifyTransfer } from "../helpers/rave";

import TasksService from "../DB/services/tasks";
import TransactionsService from "../DB/services/transactions";

const tasksService = new TasksService();
const transactionService = new TransactionsService();

export default class Hooks {
  async rave(req, res) {
    try {
      const { data, event } = req.body;
      switch (event) {
        case "charge.completed":
          const transVerification = await transVerify(data.id);
          if (transVerification.status !== "success") {
            return out(res, undefined, 400, "Transaction failed", "CH0-0");
          }
          if (transVerification.data.status !== "successful") {
            return out(res, undefined, 400, "Transaction failed", "CH0-1");
          }
          console.log("called 1");
          const updates = await tasksService.update(
            { txRef: data.tx_ref },
            { status: "Verified" }
          );
          console.log("called 2", updates);
          if (updates.modifiedCount === 1 || updates.matchedCount === 1) {
            console.log("called 3");
            return out(
              res,
              undefined,
              204,
              "Transaction successful",
              undefined
            );
          }
          break;
        case "transfer.completed":
          const transferVerification = await verifyTransfer(data.id);
          if (transferVerification.status !== "success") {
            return out(res, undefined, 400, "Transfer failed", "CH0-2");
          }
          console.log(transferVerification);
          if (transferVerification.data.status.toLowerCase() !== "successful") {
            return out(res, undefined, 400, "Transfer failed", "CH0-3");
          }
          const transactionUpdate = await transactionService.update(
            {
              reference: `${data.id}-${data.reference}`,
            },
            { status: "Verified" }
          );
          if (transactionUpdate.modifiedCount === 0) {
            return out(
              res,
              undefined,
              400,
              "Transaction update failed",
              "CH0-4"
            );
          }
          return out(res, undefined, 204, "Transfer successful", undefined);
      }
    } catch (error) {
      console.log(error);
      return out(res, undefined, 500, "Transaction failed", "CH0-5");
    }
  }
}
