import validator from '../../helpers/validator';
import { login } from './schemas/users';

export const validateLogin = (req, res, next) => {
    validator(login, req.body, res, next);
}