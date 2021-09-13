import { Router } from "express";
import Users from "../controllers/users";
import { validateLogin } from "../middlewares/validation/users";

const router = Router();
const user = new Users();

router.post("/login", validateLogin, user.login);

export default router;