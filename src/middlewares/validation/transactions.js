import { payoutSchema } from "./schemas/transactions";
import validator from "../../helpers/validator";

export const validatePayoutRequest = (req, res, next) => {
    validator(payoutSchema, req.body, res, next);
}