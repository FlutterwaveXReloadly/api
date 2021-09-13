import joi from 'joi';

export const login = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
});

export const signup = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    country: joi.string().required(),
    names: joi.string().required(),
});