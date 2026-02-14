import { body, param } from 'express-validator';
import { checkValidators } from './check.validators.js';

export const validateCreateProduct = [
    body('productId')
        .notEmpty().withMessage('El ID del producto es requerido')
        .isNumeric().withMessage('El ID debe ser un valor numérico'),

    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .isLength({ max: 100 }),

    body('categoria')
        .trim()
        .notEmpty().withMessage('La categoría es requerida'),

    body('precio')
        .notEmpty().withMessage('El precio es requerido')
        .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),

    body('imagen_url')
        .optional()
        .isURL().withMessage('Debe proporcionar una URL válida para la imagen'),

    body('estado')
        .optional()
        .isIn(['Disponible', 'Agotado', 'Descontinuado']).withMessage('Estado no válido'),

    checkValidators
];

export const validateProductId = [
    param('id').isMongoId().withMessage('ID de producto no válido'),
    checkValidators
];