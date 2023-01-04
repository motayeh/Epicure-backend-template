import { Router } from 'express';
import { DishesController } from '../controllers/dishController';

const router = Router();

router.get('/getDishes', DishesController.getDish);
// router.get('/getChef', ChefsController.getChef);
router.post('/createDish', DishesController.createDish);
// router.post('/updateChef', ChefsController.updateChef);

export default router;
