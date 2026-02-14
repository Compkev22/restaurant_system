'use strict';

import { body, param } from 'express-validator';
import { checkValidators } from './check.validators.js';

export const validateCreateEvent = [
    body('EventNumberOfPersons')
        .trim()
        .notEmpty()
        .withMessage('El número de personas es requerido')
        .isLength({ max: 20 })
        .withMessage('El número de personas no puede tener más de 20 caracteres'),

    body('EventNumberOfTables')
        .trim()
        .notEmpty()
        .withMessage('El número de mesas es requerido')
        .isLength({ max: 100 })
        .withMessage('El número de mesas no puede tener más de 100 caracteres'),

    body('Combo')
        .notEmpty()
        .withMessage('El combo es requerido')
        .isMongoId()
        .withMessage('El combo debe ser un ObjectId válido'),

    body('EventTotal')
        .notEmpty()
        .withMessage('El total es requerido')
        .isNumeric()
        .withMessage('El total debe ser un número válido'),

    body('EventStatus')
        .optional()
        .isIn(['ACTIVE', 'INACTIVE'])
        .withMessage('Estado no válido'),

    checkValidators,
];

export const validateUpdateEventRequest = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId'),

    body('EventNumberOfPersons')
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage('El número de personas no puede tener más de 20 caracteres'),

    body('EventNumberOfTables')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('El número de mesas no puede tener más de 100 caracteres'),

    body('Combo')
        .optional()
        .isMongoId()
        .withMessage('El combo debe ser un ObjectId válido'),

    body('EventTotal')
        .optional()
        .isNumeric()
        .withMessage('El total debe ser un número válido'),

    body('EventStatus')
        .optional()
        .isIn(['ACTIVE', 'INACTIVE'])
        .withMessage('Estado no válido'),

    checkValidators,
];

export const validateEventStatusChange = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId'),

    checkValidators,
];

export const validateGetEventById = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId'),

    checkValidators,
];
