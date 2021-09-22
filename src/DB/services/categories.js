import categories from "../models/categories";

export default class Categories {
  async add(raw) {
    return await categories.create(raw);
  }

  async get(search) {
    return await categories.find(search);
  }

  async update(search, raw) {
    return await categories.updateOne(search, raw, { new: true });
  }
}
