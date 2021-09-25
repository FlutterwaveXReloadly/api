import joi from 'joi';

export const payoutSchema = joi.object().keys({
    amount: joi.number().required()
});
