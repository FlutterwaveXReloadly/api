import tasks from "../models/tasks";

export default class Tasks {
  async add(raw) {
    return await tasks.create(raw);
  }

  async get(search) {
    return await tasks.find(search);
  }

  async update(search, raw) {
    return await tasks.updateOne(search, raw, { new: true });
  }
}
