import validator from "../helpers/validator";
import { addCategorySchema } from "../middlewares/validation/schemas/categories";

export const validateAddCategory = (req, res, next) => {
    validator(addCategorySchema, req.body, res, next)
};
