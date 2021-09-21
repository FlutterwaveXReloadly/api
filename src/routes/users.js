import { Router } from "express";
import Users from "../controllers/users";
import {
  validateLogin,
  validateSignup,
  validatePasswordReset,
  validateForgotPassword,
  validateUpdateProfile,
} from "../middlewares/validation/users";
import { isLoggedIn } from "../middlewares/access";

const router = Router();
const user = new Users();

router.get("/", isLoggedIn, user.pullUser);
router.post("/login", validateLogin, user.login);
router.post("/signup/:type", validateSignup, user.signup);
router.get("/verify", user.verify);
router.patch("/password/reset", validatePasswordReset, user.resetPassword);
router.post("/password/send-forgot-link", validateForgotPassword, user.forgotPassword);
router.patch("/update", isLoggedIn, validateUpdateProfile, user.updateUser);

export default router;