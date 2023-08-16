import {Router} from 'express';
import {getAllUsers, postUser, getUserById, deteleUser, putUser} from '../controllers/user.controller.js';

const router = Router()

router.get('/', getAllUsers);
router.post('/', postUser);
router.get('/:id' ,getUserById);
router.delete('/:id', deteleUser);
router.put('/:id', putUser);

export default router;