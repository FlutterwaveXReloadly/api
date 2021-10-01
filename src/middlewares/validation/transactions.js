import { payoutSchema, topupSchema, orderGiftCard } from "./schemas/transactions";
import validator from "../../helpers/validator";

export const validatePayoutRequest = (req, res, next) => {
    validator(payoutSchema, req.body, res, next);
}

export const validateTopupRequest = (req, res, next) => {
    validator(topupSchema, req.body, res, next);
}

export const validateOrderGiftCard = (req, res, next) => {
    validator(orderGiftCard, req.body, res, next);
}