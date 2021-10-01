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

export const passwordReset = joi.object().keys({
    password: joi.string().min(8).required(),
    token: joi.string().required()
});

export const forgotPassword = joi.object().keys({
    email: joi.string().email().required()
});

export const updateProfile = joi.object().keys({
    country: joi.string(),
    email: joi.string().email(),
    names: joi.string(),
    password: joi.string().min(8),
    bankDetails: {
        accountNumber: joi.number(),
        bankName: joi.string(),
        bankId: joi.string(),
    },
    skills: joi.array().items(joi.string()),
    phoneNumber: joi.string(),
});