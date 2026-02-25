import { body, param } from 'express-validator';
import Order from '../src/Order/order.model.js';
import { checkValidators } from './check.validators.js';

const allowedStatuses = [
    'Pendiente',
    'En Preparacion',
    'Listo',
    'Entregado',
    'Cancelado',
    'Finalizada'
];

const allowedTransitions = {
    Pendiente: ['En Preparacion', 'Cancelado'],
    'En Preparacion': ['Listo'],
    Listo: ['Entregado'],
    Entregado: ['Finalizada'],
    Cancelado: [],
    Finalizada: []
};

export const validateCreateOrder = [
    body('estado')
        .optional()
        .isIn(allowedStatuses)
        .withMessage('Estado inválido'),
    checkValidators
];

export const validateUpdateStatus = [
    param('id')
        .isMongoId()
        .withMessage('ID de orden inválido'),
    body('estado')
        .isIn(allowedStatuses)
        .withMessage('Estado inválido'),
    body('estado').custom(async (newStatus, { req }) => {
        const order = await Order.findById(req.params.id);
        if (!order) {
            throw new Error('Orden no encontrada');
        }
        const currentStatus = order.estado;
        const validNextStatuses = allowedTransitions[currentStatus] || [];
        if (!validNextStatuses.includes(newStatus)) {
            throw new Error(
                `Transición inválida: ${currentStatus} → ${newStatus}`
            );
        }
        return true;
    }),

    checkValidators
];