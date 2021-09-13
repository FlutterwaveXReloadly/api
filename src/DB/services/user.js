import userModel from "../models/users";

export default class User {
  async add(raw) {
    const user = await userModel.create(raw);
    return user;
  }

  async get(search) {
    const results = await userModel.find(search);
    return results;
  }

  async update(search, raw) {
    const updates = await userModel.updateOne(search, raw, { new: true });
    return updates;
  }
}
