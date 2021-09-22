import joi from 'joi';

export const addTask = joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
    amount: joi.number().required(),
})