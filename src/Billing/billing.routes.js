import { Router } from 'express';
import {
    getBillings,
    getBillingById,
    createBilling,
    updateBilling,
    changeBillingStatus
} from './billing.controller.js';

const router = Router();

router.get('/', getBillings);

router.get('/:id', getBillingById);

router.post(
    '/',
    createBilling
);

router.put(
    '/:id',
    updateBilling
);

router.put(
    '/:id/status',
    changeBillingStatus
);

export default router;
