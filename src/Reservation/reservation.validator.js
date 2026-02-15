import { body, validationResult } from 'express-validator';

// Definimos la función localmente para evitar errores de importación
const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Error de validación en la reservación',
            errors: errors.array()
        });
    }
    next();
};

export const reservationValidator = [
    body('table', 'El ID de la mesa debe ser válido').isMongoId(),
    body('client', 'El nombre del cliente es obligatorio').notEmpty(), 
    body('date', 'La fecha es obligatoria').isDate(),
    body('time', 'La hora es obligatoria').notEmpty(),
    validateFields 
];