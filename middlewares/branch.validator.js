import { body, param } from 'express-validator';
import { checkValidators } from './check.validators.js';

export const validateCreateBranch = [
    body('nombre').notEmpty().trim().withMessage('El nombre es requerido'),
    body('zona').isInt({ min: 1, max: 25 }).withMessage('Zona inválida'),
    body('telefono').isNumeric().isLength({ min: 8, max: 8 }).withMessage('Teléfono debe tener 8 dígitos'),
    body('tieneAutoservicio').isBoolean().withMessage('Especifique si tiene autoservicio'),
    checkValidators
];

export const validateUpdateBranch = [
    param('id').isMongoId().withMessage('ID de registro inválido'),
    checkValidators
];