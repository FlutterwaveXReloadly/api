import { v4 } from "uuid";
import { standard } from "../helpers/rave";
import UserService from "../DB/services/user";
import TaskService from "../DB/services/tasks";
import out from "../helpers/out";
import { get, set } from "../helpers/redis";
import mongoose from "mongoose";

const userService = new UserService();
const taskService = new TaskService();

export default class User {
  async createTask(req, res) {
    try {
      const { body } = req;
      const user = await userService.get({ _id: req.user });
      const txRef = v4();
      const task = await taskService.add({
        ...body,
        status: "unVerified",
        user: req.user,
        txRef,
      });
      const pay = await standard(
        body.amount,
        txRef,
        {
          taskId: task._id,
          user: req.user,
        },
        {
          email: user[0].email,
          name: user[0].names,
          phoneNumber: user[0].phoneNumber,
        }
      );
      if (pay.data && task) {
        return out(
          res,
          { pay: pay.data, task },
          201,
          "Tasks created",
          undefined
        );
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
      const cached = await get(id ? `tasks-${id}` : `tasks`);
      if (cached) {
        return out(res, cached, 200, "Tasks found", undefined);
      }
      const tasks = await taskService.get(search);
      if (tasks.length > 0) {
        await set(id ? `tasks-${id}` : `tasks`, tasks);
        return out(res, tasks, 200, "Tasks found", undefined);
      }
      return out(res, undefined, 404, "Tasks not found", "CT0-0");
    } catch (error) {
      console.log(error);
      return out(res, undefined, 500, "Internal server error", "CT0-1");
    }
  }

  async getByCategory(req, res) {
    try {
      const { id } = req.params;
      const cached = await get(id ? `tasks-cat-${id}` : `tasks-cat`);
      if (cached) {
        return out(res, cached, 200, "Tasks found", undefined);
      }
      console.log(id);
      const tasks = await taskService.get({
        category: mongoose.Types.ObjectId("614b3b3c3433aaf413214c1e"),
      });
      if (tasks.length > 0) {
        await set(id ? `tasks-cat-${id}` : `tasks-cat`, tasks);
        return out(res, tasks, 200, "Tasks found", undefined);
      }
      return out(res, undefined, 404, "Tasks not found", "CT1-0");
    } catch (error) {
      console.log(error);
      return out(res, undefined, 500, "Internal server error", "CT1-1");
    }
  }

  async registerInterest(req, res) {
    try {
      const { id } = req.params;
      const { user } = req;
      const updates = await taskService.update(
        { _id: id },
        { $push: { interests: user } }
      );
      if (updates.modifiedCount === 1) {
        return out(res, updates, 200, "Interest registered", undefined);
      }
      return out(res, undefined, 400, "Bad Request", "CT2-0");
    } catch (error) {
      console.log(error);
      return out(res, undefined, 500, "Internal server error", "CT2-1");
    }
  }

  async registerProgress(req, res) {
    try {
      const { id } = req.params;
      const { progress } = req.body;
      const updates = await taskService.update(
        { _id: id },
        {
          progress,
        }
      );
      if (updates.modifiedCount === 1) {
        return out(res, updates, 200, "updated", undefined);
      }
      return out(res, undefined, 400, "Bad Request", "CT3-0");
    } catch (error) {
      console.log(error);
      return out(res, undefined, 500, "Internal server error", "CT3-1");
    }
  }

  async registerCompletion(req, res) {
    try {
      const { id } = req.params;
      const { completion } = req.body;
      const updates = await taskService.update(
        { _id: id },
        {
          completion,
        }
      );
      if (updates.modifiedCount === 1) {
        return out(res, updates, 200, "updated", undefined);
      }
      return out(res, undefined, 400, "Bad Request", "CT4-0");
    } catch (error) {
      console.log(error);
      return out(res, undefined, 500, "Internal server error", "CT4-1");
    }
   }
}
