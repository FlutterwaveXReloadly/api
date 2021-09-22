import joi from "joi";

export const addCategorySchema = joi.object().keys({
  name: joi.string().required(),
  description: joi.string().required(),
});

export const updateCategorySchema = joi.object().keys({
    name: joi.string(),
    description: joi.string(),
});