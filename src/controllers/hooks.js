import out from "../helpers/out";
import { transVerify } from "../helpers/rave";
import TasksService from "../DB/services/tasks";

const tasksService = new TasksService();

export default class Hooks {
  async rave(req, res) {
    try {
      const { data } = req.body;
      const transVerification = await transVerify(data.id);
      if (transVerification.status !== "success") {
        return out(res, undefined, 400, "Transaction failed", "CH0-0");
      }
      if (transVerification.data.status !== "successful") {
        return out(res, undefined, 400, "Transaction failed", "CH0-1");
      }
      console.log('called 1');
      const updates = await tasksService.update(
        { txRef: data.tx_ref },
        { status: "Verified" }
      );
      console.log('called 2', updates);
      if (updates.modifiedCount === 1 || updates.matchedCount === 1) {
        console.log('called 3');
        return out(res, undefined, 204, "Transaction successful", undefined);
      }
    } catch (error) {
      console.log(error);
      return out(res, undefined, 500, "Transaction failed", "CH0-2");
    }
  }
}
