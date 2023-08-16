import {Router} from 'express';
import {getAllCourses,postCourse} from '../controllers/courses.controller.js';

const router = Router();

router.get('/', getAllCourses);
router.post('/', postCourse);
// router.get('/')
// router.delete('/')
// router.put('/')

export default router;