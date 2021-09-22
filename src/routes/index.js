import { Router } from 'express';
import users from './users';
import tasks from './tasks';
import hooks from './hooks';

const router = Router();

router.use('/users', users);
router.use('/tasks', tasks);
router.use('/hooks', hooks);

export default router;
