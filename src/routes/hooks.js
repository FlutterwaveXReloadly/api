import { Router } from 'express';
import { isRave } from '../middlewares/access';
import Hooks from '../controllers/hooks';

const router = Router();
const hooks = new Hooks();

router.post('/rave', isRave, hooks.rave);

export default router;
