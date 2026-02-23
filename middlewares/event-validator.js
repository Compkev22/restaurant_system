event-validator
import { body, param } from 'express-validator';
import { checkValidators } from './check.validators.js';

export const validateCreateEvent = [

    body('branchId')
        .notEmpty()
        .withMessage('La sucursal es obligatoria')
        .isMongoId()
        .withMessage('La sucursal debe ser un ObjectId válido'),

    body('clientId')
        .notEmpty()
        .withMessage('El cliente es obligatorio')
        .isMongoId()
        .withMessage('El cliente debe ser un ObjectId válido'),

    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre del evento es obligatorio')
        .isLength({ max: 100 })
        .withMessage('El nombre no puede exceder los 100 caracteres'),

    body('eventDate')
        .notEmpty()
        .withMessage('La fecha del evento es obligatoria')
        .isISO8601()
        .withMessage('La fecha debe tener formato válido (YYYY-MM-DD)')
        .toDate(),

    body('startTime')
        .notEmpty()
        .withMessage('La hora de inicio es obligatoria')
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .withMessage('La hora debe tener formato HH:mm'),

    body('endTime')
        .notEmpty()
        .withMessage('La hora de finalización es obligatoria')
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .withMessage('La hora debe tener formato HH:mm'),

    body('numberOfPersons')
        .notEmpty()
        .withMessage('Debe indicar la cantidad de personas')
        .isInt({ min: 1 })
        .withMessage('La cantidad de personas debe ser mayor a 0'),

    body('tables')
        .isArray({ min: 1 })
        .withMessage('Debe enviar al menos una mesa'),

    body('tables.*')
        .isMongoId()
        .withMessage('Cada mesa debe ser un ObjectId válido'),

    body('status')
        .optional()
        .isIn(['Pendiente', 'Confirmado', 'Cancelado', 'Finalizado'])
        .withMessage('Estado no válido'),

    body('notes')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Las notas no pueden exceder los 500 caracteres'),

    checkValidators,
];

export const validateUpdateEventRequest = [

    param('id')
        .isMongoId()
        .withMessage('El ID debe ser un ObjectId válido'),

    body('branchId')
        .optional()
        .isMongoId()
        .withMessage('La sucursal debe ser un ObjectId válido'),

    body('clientId')
        .optional()
        .isMongoId()
        .withMessage('El cliente debe ser un ObjectId válido'),

    body('name')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('El nombre no puede exceder los 100 caracteres'),

    body('eventDate')
        .optional()
        .isISO8601()
        .withMessage('La fecha debe tener formato válido (YYYY-MM-DD)')
        .toDate(),

    body('startTime')
        .optional()
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .withMessage('La hora debe tener formato HH:mm'),

    body('endTime')
        .optional()
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .withMessage('La hora debe tener formato HH:mm'),

    body('numberOfPersons')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La cantidad de personas debe ser mayor a 0'),

    body('tables')
        .optional()
        .isArray({ min: 1 })
        .withMessage('Debe enviar al menos una mesa'),

    body('tables.*')
        .optional()
        .isMongoId()
        .withMessage('Cada mesa debe ser un ObjectId válido'),

    body('status')
        .optional()
        .isIn(['Pendiente', 'Confirmado', 'Cancelado', 'Finalizado'])
        .withMessage('Estado no válido'),

    body('notes')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Las notas no pueden exceder los 500 caracteres'),

    checkValidators,
];


export const validateEventStatusChange = [

    param('id')
        .isMongoId()
        .withMessage('El ID debe ser un ObjectId válido'),

    body('status')
        .notEmpty()
        .withMessage('Debe enviar el nuevo estado')
        .isIn(['Pendiente', 'Confirmado', 'Cancelado', 'Finalizado'])
        .withMessage('Estado no válido'),

    checkValidators,
];


export const validateGetEventById = [

    param('id')
        .isMongoId()
        .withMessage('El ID debe ser un ObjectId válido'),

    checkValidators,
];