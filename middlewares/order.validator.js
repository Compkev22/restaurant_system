import { body, param } from 'express-validator';
import { checkValidators } from './check.validators.js';

export const validateCreateOrder = [
    body('orderId').isNumeric().withMessage('ID de orden debe ser numérico'),
    body('detallePedidoId').isNumeric().withMessage('ID de detalle debe ser numérico'),
    body('mesaId').isNumeric().withMessage('ID de mesa debe ser numérico'),
    body('empleadoId').isNumeric().withMessage('ID de empleado debe ser numérico'),
    body('estado').optional().isIn(['Pendiente', 'En Preparacion', 'Listo', 'Entregado', 'Cancelado']),
    checkValidators
];

export const validateUpdateStatus = [
    param('id').isMongoId().withMessage('ID de registro inválido'),
    body('estado').isIn(['Pendiente', 'En Preparacion', 'Listo', 'Entregado', 'Cancelado']),
    checkValidators
];