import CategoriesService from "../DB/services/categories";
import out from "../helpers/out";
import { get, set } from "../helpers/redis";

const categoriesService = new CategoriesService();
export default class Categories {
  async add(req, res) {
    try {
      const newCategory = await categoriesService.add(req.body);
      if (newCategory === undefined || newCategory === null) {
        return out(res, undefined, 400, "Category not added", "CC0-0");
      }
      return out(res, newCategory, 200, "Category added", undefined);
    } catch (error) {
      console.log(error);
      return out(res, undefined, 500, "Internal server error", "CC0-1");
    }
  }

  async get(req, res) {
    try {
      const { id } = req.params;
      const search = id && { id };
      const cached = await get(id ? `cat-${id}` : "cat");
      if (cached) {
        return out(res, cached, 200, "Category found", undefined);
      }
      const category = await categoriesService.get(search);
      if (category.length === 0) {
        return out(res, undefined, 404, "Category not found", "CC1-0");
      }
      await set(id ? `cat-${id}` : "cat", category);
      return out(res, category, 200, "Category found", undefined);
    } catch (error) {
      console.log(error);
      return out(res, undefined, 500, "Internal server error", "CC1-1");
    }
  }
}
