import { v4 } from "uuid";
import { standard } from "../helpers/rave";
import UserService from "../DB/services/user";
import TaskService from "../DB/services/tasks";
import out from "../helpers/out";
import { get, set } from "../helpers/redis";

const userService = new UserService();
const taskService = new TaskService();

export default class User {
  async createTask(req, res) {
    try {
      const { body } = req;
      const user = await userService.get({ _id: req.user });
      const task = await taskService.add({ ...body, user: req.user });
      const pay = await standard(
        body.amount,
        v4(),
        {
          taskId: task._id,
          user: req.user,
        },
        {
          email: user[0].email,
          name: user[0].names,
          phoneNumber: user[0].phoneNumber || "0780964422",
        }
      );
      if (pay.data && task) {
        return out(res, pay.data, 201, "Tasks created", undefined);
      }
      return out(res, { ...pay, task }, 400, "Bad Request", "CT0-0");
    } catch (error) {
      console.log(error);
      return out(res, undefined, 500, "Internal server error", "CT0-1");
    }
  }

  async getTasks(req, res) {
    try {
      const { id } = req.params;
      const search = id && { _id: id };
      const cached = await get(id ? `tasks:${id}` : `tasks`);
      if (cached) {
        return out(res, cached, 200, "Tasks found", undefined);
      }
      const tasks = await taskService.get(search);
      if (tasks.length > 0) {
        await set(id ? `tasks:${id}` : `tasks`, tasks);
        return out(res, tasks, 200, "Tasks found", undefined);
      }
      return out(res, undefined, 404, "Tasks not found", undefined);
    } catch (error) {
      console.log(error);
      return out(res, undefined, 500, "Internal server error", "CT0-2");
    }
  }
}
