'use strict';

import { Router } from 'express';
import { getOrders, createOrder, updateOrderStatus } from '../Order/order.controller.js';
import { validateCreateOrder, validateUpdateStatus } from '../../middlewares/order-validators.js';

const router = Router();

router.get('/', getOrders);
router.post('/', validateCreateOrder, createOrder);
router.patch('/:id/status', validateUpdateStatus, updateOrderStatus);

export default router;