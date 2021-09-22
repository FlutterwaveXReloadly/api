import { Router } from 'express';
import users from './users';
import tasks from './tasks';
import hooks from './hooks';
import categories from './categories';

const router = Router();

router.use('/users', users);
router.use('/tasks', tasks);
router.use('/hooks', hooks);
router.use('/categories', categories);

export default router;
