import {Router} from 'express';

import categoryRoutes from './category.routes.js';
import courseRoutes from './course.routes.js';
import userRoutes from './user.routes.js';
import moduleName from 'module';

const router = Router()

router.use('/category',categoryRoutes);
router.use('/course',courseRoutes);
router.use('/user',userRoutes);


export default router;