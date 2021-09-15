import { Router } from "express";
import Users from "../controllers/users";
import { validateLogin, validateSignup } from "../middlewares/validation/users";

const router = Router();
const user = new Users();

router.post("/login", validateLogin, user.login);
router.post("/signup/:type", validateSignup, user.signup);

export default router;