import { Router } from 'express';
import {getAllCategory, postCategory} from '../controllers/category.controller.js';


const router = Router();

router.get('/', getAllCategory);
router.post('/', postCategory);
// router.get('/:id', getByIdCategory);
// router.delete('/:id', deleteCategory);
// router.put('/:id', putCategory);

export default router;