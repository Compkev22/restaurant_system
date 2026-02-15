import { body, validationResult } from 'express-validator';

// Creamos la función aquí mismo para que no de error de importación
const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Error de validación en el menú',
            errors: errors.array()
        });
    }
    next();
};

export const menuValidator = [
    body('name', 'El nombre es obligatorio').notEmpty(),
    body('type', 'El tipo debe ser Individual o Combo').isIn(['Individual', 'Combo']),
    body('price', 'El precio debe ser un número positivo').isFloat({ min: 0 }),
    validateFields 
];