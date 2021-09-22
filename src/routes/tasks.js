import { Router } from 'express';
import TaskController from '../controllers/tasks';
import { validateAddTask } from '../middlewares/validation/tasks';
import { isCompany, isLoggedIn } from '../middlewares/access';

const router = new Router();
const taskController = new TaskController();

router.post('/add', isCompany, validateAddTask, taskController.createTask);
router.get('/', isLoggedIn, taskController.getTasks);

export default router;
