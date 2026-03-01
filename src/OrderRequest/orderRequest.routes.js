'use strict';

import { Router } from 'express';
import {
    createOrderRequest,
    getMyOrderRequests,
    getBranchOrderRequests,
    updateOrderRequestStatus,
    cancelOrderRequest
} from './orderRequest.controller.js';

import { validateJWT } from '../../middlewares/validate-jwt.js';
import { hasRole } from '../../middlewares/role-validator.js'

const router = Router();

/**
 * CLIENTES
 */
// Crear pedido
router.post(
    '/',
    validateJWT,
    hasRole('CLIENT'),
    createOrderRequest
);
// Ver mis pedidos
router.get(
    '/mine',
    validateJWT,
    hasRole('CLIENT'),
    getMyOrderRequests
);
// Cancelar pedido
router.put(
    '/cancel/:id',
    validateJWT,
    hasRole('CLIENT'),
    cancelOrderRequest
);

/**
 * PERSONAL RESTAURANTE
 */
// Ver pedidos por sucursal
router.get(
    '/branch/:branchId',
    validateJWT,
    hasRole('EMPLOYEE', 'BRANCH_ADMIN', 'PLATFORM_ADMIN'),
    getBranchOrderRequests
);
// Cambiar estado
router.put(
    '/status/:id',
    validateJWT,
    hasRole('EMPLOYEE', 'BRANCH_ADMIN'),
    updateOrderRequestStatus
);
export default router;