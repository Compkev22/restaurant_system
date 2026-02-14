import { Router } from 'express';
import {
    getCombos,
    getComboById,
    createCombo,
    updateCombo,
    changeComboStatus
} from './combo.controller.js';

const router = Router();

router.get('/', getCombos);

router.get('/:id', getComboById);

router.post(
    '/',
    createCombo
);

router.put(
    '/:id',
    updateCombo
);

router.put(
    '/:id/status',
    changeComboStatus
);

export default router;
