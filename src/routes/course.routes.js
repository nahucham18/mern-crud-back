import {Router} from 'express';
import {getAllCourses,postCourse, getCourseById} from '../controllers/courses.controller.js';

const router = Router();

router.get('/', getAllCourses);
router.post('/', postCourse);
router.get('/:id' ,getCourseById)
// router.delete('/')
// router.put('/')

export default router;