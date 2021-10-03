import { Router } from 'express';
import UtilityController from '../controllers/utilities';
import { isLoggedIn } from '../middlewares/access';

const router = Router();
const utilityController = new UtilityController();

router.get('/banks/:country', isLoggedIn, utilityController.getBanks);

export default router;