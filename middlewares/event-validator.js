import { body, validationResult } from 'express-validator';

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Error de validación en el evento',
            errors: errors.array()
        });
    }
    next();
};

export const eventValidator = [

    body('branchId', 'La sucursal es obligatoria')
        .notEmpty()
        .isMongoId(),

    body('clientId', 'El cliente es obligatorio')
        .notEmpty()
        .isMongoId(),

    body('name', 'El nombre del evento es obligatorio')
        .notEmpty()
        .isString()
        .trim(),

    body('eventDate', 'La fecha del evento es obligatoria')
        .notEmpty()
        .isISO8601()
        .toDate(),

    body('startTime', 'La hora de inicio es obligatoria')
        .notEmpty()
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .withMessage('La hora debe tener formato HH:mm'),

    body('endTime', 'La hora de finalización es obligatoria')
        .notEmpty()
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .withMessage('La hora debe tener formato HH:mm'),

    body('numberOfPersons', 'Debe indicar la cantidad de personas')
        .notEmpty()
        .isInt({ min: 1 }),

    body('tables', 'Debe enviar un arreglo de mesas')
        .isArray({ min: 1 }),

    body('tables.*', 'Cada mesa debe ser un ID válido')
        .isMongoId(),

    body('status')
        .optional()
        .isIn(['Pendiente', 'Confirmado', 'Cancelado', 'Finalizado']),

    body('notes')
        .optional()
        .isString()
        .trim(),

    validateFields
];