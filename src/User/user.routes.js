import { Router } from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    changeUserStatus
} from './user.controller.js';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);

router.post(
    '/',
    createUser
);

router.put(
    '/:id',
    updateUser
);

router.put('/:id/status', changeUserStatus);


export default router;