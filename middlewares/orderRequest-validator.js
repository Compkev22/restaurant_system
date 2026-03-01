'use strict';

import { body, param } from 'express-validator';
import OrderRequest from '../src/OrderRequest/orderRequest.model.js';
import { checkValidators } from './check.validators.js';

// tipos de pedido permitidos
const allowedOrderTypes = ['LOCAL', 'PICKUP', 'DELIVERY'];

// validar creación de order request
export const validateCreateOrderRequest = [

    // tipo de pedido obligatorio
    body('orderType')
        .notEmpty().withMessage('orderType es obligatorio')
        .isIn(allowedOrderTypes)
        .withMessage('Tipo de pedido inválido'),

    // sucursal obligatoria
    body('branch')
        .notEmpty().withMessage('branch es obligatorio')
        .isMongoId().withMessage('branch inválido'),

    // validaciones condicionales según tipo de pedido
    body().custom((body, { req }) => {
        const userRole = req.user?.role;

        // LOCAL solo lo crea el empleado
        if (body.orderType === 'LOCAL' && userRole !== 'EMPLOYEE') {
            throw new Error('Solo empleados pueden crear pedidos LOCAL');
        }

        // DELIVERY requiere dirección
        if (body.orderType === 'DELIVERY' && !body.deliveryAddress) {
            throw new Error('deliveryAddress requerido para DELIVERY');
        }

        // PICKUP no necesita datos adicionales
        return true;
    }),

    checkValidators
];

// estados permitidos de order request
const allowedStatuses = [
    'Pendiente',
    'En Preparacion',
    'Listo',
    'Entregado',
    'Cancelado',
    'Finalizado'
];

// validar cambio de estado de order request
export const validateUpdateOrderRequestStatus = [

    // validar id de pedido
    param('id')
        .isMongoId().withMessage('ID de pedido inválido'),

    // validar estado
    body('orderStatus')
        .notEmpty().withMessage('orderStatus es obligatorio')
        .isIn(allowedStatuses)
        .withMessage('Estado inválido'),

    checkValidators
];