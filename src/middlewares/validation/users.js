import validator from '../../helpers/validator';
import { login, signup } from './schemas/users';

export const validateLogin = (req, res, next) => {
    validator(login, req.body, res, next);
}

export const validateSignup = (req, res, next) => {
    validator(signup, req.body, res, next);
}