import joi from 'joi';

export const payoutSchema = joi.object().keys({
    amount: joi.number().required()
});

export const topupSchema = joi.object().keys({
    amount: joi.number().required(),
    number: joi.string().required(),
    country: joi.string().min(2).max(4).required()
});

export const orderGiftCard = joi.object().keys({
    quantity: joi.number().required(),
    denomination: joi.number().required(),
    productId: joi.number().required()
})