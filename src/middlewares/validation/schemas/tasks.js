import joi from 'joi';

export const addTask = joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
    amount: joi.number().required(),
    category: joi.string().required(),
})

export const updateTask = joi.object().keys({
    title: joi.string(),
    description: joi.string(),
})

export const registerCompletion = joi.object().keys({
    completion: joi.string().required(),
});

export const registerProgress = joi.object().keys({
    progress: joi.string().required(),
});