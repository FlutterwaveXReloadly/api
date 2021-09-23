import { Router } from 'express';
import TaskController from '../controllers/tasks';
import {
  validateAddTask,
  validateRegisterProgress,
  validateRegisterCompletion,
  validateApproveInterest,
} from "../middlewares/validation/tasks";
import { isCompany, isLoggedIn, isNormalUser } from "../middlewares/access";

const router = new Router();
const taskController = new TaskController();

router.post("/add", isCompany, validateAddTask, taskController.createTask);
router.get(["/", "/:id"], isLoggedIn, taskController.getTasks);
router.get("/sort/category/:id", isLoggedIn, taskController.getByCategory);
router.patch("/interests/:id", isNormalUser, taskController.registerInterest);
router.patch(
  "/completion/:id",
  isCompany,
  validateRegisterCompletion,
  taskController.registerCompletion
);
router.patch(
  "/progress/:id",
  isNormalUser,
  validateRegisterProgress,
  taskController.registerProgress
);
router.patch(
  "/approve/interests/:id",
  isCompany,
  validateApproveInterest,
  taskController.approveInterest
);
export default router;
