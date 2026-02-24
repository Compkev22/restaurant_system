import { body, param } from 'express-validator';
import { checkValidators } from './check.validators.js';

export const validateCreateOrder = [
    body('estado').optional().isIn(['Pendiente', 'En Preparacion', 'Listo', 'Entregado', 'Cancelado']),
    checkValidators
];

export const validateUpdateStatus = [
    param('id').isMongoId().withMessage('ID de registro inválido'),
    body('estado').isIn(['Pendiente', 'En Preparacion', 'Listo', 'Entregado', 'Cancelado']),
    checkValidators
];