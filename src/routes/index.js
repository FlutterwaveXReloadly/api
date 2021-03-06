import { Router } from 'express';
import users from './users';
import tasks from './tasks';
import hooks from './hooks';
import categories from './categories';
import wallets from './wallets';
import transactions from './transactions';
import utilities from './utilities';

const router = Router();

router.use('/users', users);
router.use('/tasks', tasks);
router.use('/hooks', hooks);
router.use('/categories', categories);
router.use('/wallets', wallets);
router.use('/transactions', transactions);
router.use('/utilities', utilities);

export default router;
