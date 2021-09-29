import Products from "../models/products";

export default class Product {
  async upsert(query, raw) {
    const product = await Products.updateOne(query, raw, {
      upsert: true,
      new: true,
    });
    return product;
  }

  async search(query) {
    const products = await Products.find(query);
    return products;
  }
}
