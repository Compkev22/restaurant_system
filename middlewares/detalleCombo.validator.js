'use strict';

import { body } from 'express-validator';
import { checkValidators } from './check.validators.js'; // Asegúrate que este nombre coincida con tu archivo de errores

export const saveDetalleComboValidator = [
    body('comboId', 'El ID del combo es requerido').notEmpty().isMongoId(),
    body('productId', 'El ID del producto es requerido').notEmpty().isMongoId(),
    body('cantidad', 'La cantidad debe ser un número positivo').optional().isInt({ min: 1 }),
    checkValidators
];