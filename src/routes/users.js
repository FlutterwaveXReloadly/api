import { Router } from "express";
import Users from "../controllers/users";
import { validateLogin, validateSignup, validatePasswordReset, validateForgotPassword } from "../middlewares/validation/users";


const router = Router();
const user = new Users();

router.post("/login", validateLogin, user.login);
router.post("/signup/:type", validateSignup, user.signup);
router.get("/verify", user.verify);
router.patch("/password/reset", validatePasswordReset, user.resetPassword);
router.post("/password/send-forgot-link", validateForgotPassword, user.forgotPassword);


export default router;