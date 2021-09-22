import validator from "../../helpers/validator";
import {
  login,
  signup,
  passwordReset,
  forgotPassword,
  updateProfile,
} from "./schemas/users";

export const validateLogin = (req, res, next) => {
  validator(login, req.body, res, next);
};


export const validateSignup = (req, res, next) => {
  validator(signup, req.body, res, next);
};
export const validatePasswordReset = (req, res, next) => {
  validator(passwordReset, req.body, res, next);
};

export const validateForgotPassword = (req, res, next) => {
  validator(forgotPassword, req.body, res, next);
};

export const validateUpdateProfile = (req, res, next) => {
  validator(updateProfile, req.body, res, next);
};