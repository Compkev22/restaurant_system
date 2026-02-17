'use strict';

import { Router } from 'express';
import {
    createOrderDetail,
    getOrderDetailsByOrder,
    updateOrderDetail,
    deleteOrderDetail
} from './orderDetail.controller.js';

import {
    validateCreateOrderDetail,
    validateUpdateOrderDetail,
    validateOrderIdParam,
    validateOrderDetailIdParam
} from '../../../../Users/Informatica/Documents/restaurant_system-ft-RobertoMilian/restaurant_system-ft-RobertoMilian/middlewares/orderDetail-validator.js';

const router = Router();

// Crear item de orden
router.post(
    '/',
    validateCreateOrderDetail,
    createOrderDetail
);

// Obtener items por orden
router.get(
    '/order/:orderId',
    validateOrderIdParam,
    getOrderDetailsByOrder
);

// Actualizar item
router.put(
    '/:id',
    validateUpdateOrderDetail,
    updateOrderDetail
);

// Eliminar item
router.delete(
    '/:id',
    validateOrderDetailIdParam,
    deleteOrderDetail
);

export default router;
