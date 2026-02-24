import { Router } from 'express';
import {
    getBillings,
    getBillingById,
    createBilling,
    updateBilling,
    payBilling
} from './billing.controller.js';

import {
    validateCreateBilling,
    validateUpdateBillingRequest,
    validateGetBillingById
} from '../../middlewares/billing-validator.js';

const router = Router();

router.get('/', getBillings);

router.get('/:id', validateGetBillingById, getBillingById);

router.post(
    '/',
    validateCreateBilling,
    createBilling
);

router.put(
    '/:id',
    validateUpdateBillingRequest,
    updateBilling
);

router.put(
    '/:id/pay', 
    payBilling
);

export default router;
