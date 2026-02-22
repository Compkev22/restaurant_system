// src/middlewares/branch-validator.js
import { body, param } from 'express-validator';
import { checkValidators } from './check.validators.js';

const branchStatuses = ['ACTIVE', 'INACTIVE'];

export const validateCreateBranch = [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser un string'),

    body('address')
        .notEmpty().withMessage('La dirección es obligatoria')
        .isString().withMessage('La dirección debe ser un string'),

    body('phone')
        .notEmpty().withMessage('El teléfono es obligatorio')
        .isString().withMessage('El teléfono debe ser un string')
        .isLength({ min: 8 }).withMessage('El teléfono debe tener al menos 8 caracteres'),

    body('status')
        .optional()
        .isIn(branchStatuses).withMessage('status inválido'),

    checkValidators
];

export const validateUpdateBranch = [
    param('id')
        .isMongoId().withMessage('ID de sucursal inválido'),

    body('name')
        .optional()
        .isString().withMessage('El nombre debe ser un string'),

    body('address')
        .optional()
        .isString().withMessage('La dirección debe ser un string'),

    body('phone')
        .optional()
        .isString().withMessage('El teléfono debe ser un string')
        .isLength({ min: 8 }).withMessage('El teléfono debe tener al menos 8 caracteres'),

    body('status')
        .optional()
        .isIn(branchStatuses).withMessage('status inválido'),

    checkValidators
];

export const validateBranchIdParam = [
    param('id')
        .isMongoId().withMessage('ID de sucursal inválido'),
    checkValidators
];
