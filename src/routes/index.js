import { Router } from 'express';
import users from './users';
import tasks from './tasks';

const router = Router();

router.use('/users', users);
router.use('/tasks', tasks);

export default router;
