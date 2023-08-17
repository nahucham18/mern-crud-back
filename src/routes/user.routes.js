    import {Router} from 'express';
    import {getAllUsers, postUser, getUserById, getUserForCourse, deteleUser, putUser} from '../controllers/user.controller.js';

    const router = Router()

    router.get('/bycourse/', getUserForCourse)
    router.get('/', getAllUsers);
    router.post('/', postUser);
    router.get('/:id' ,getUserById);
    router.delete('/:id', deteleUser);
    router.put('/:id', putUser);

    export default router;