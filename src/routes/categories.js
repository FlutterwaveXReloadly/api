import { Router } from 'express';
import Categories from '../controllers/categories';
import { isAdmin, isLoggedIn } from '../middlewares/access';
import { validateAddCategory } from '../middlewares/categories';

const router = Router();
const categories = new Categories();

router.post('/add', isAdmin, validateAddCategory, categories.add);
router.get(['/', '/:id'], isLoggedIn, categories.get);

export default router;