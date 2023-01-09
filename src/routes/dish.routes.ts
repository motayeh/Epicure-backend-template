import { Router } from 'express';
import { DishesController } from '../controllers/dishController';

const router = Router();

router.get('/getDishes', DishesController.getDish);

router.post('/createDish', DishesController.createDish);

export default router;
