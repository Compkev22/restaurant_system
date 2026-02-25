import { body, validationResult } from 'express-validator';

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Error de validación en el inventario',
            errors: errors.array()
        });
    }
    next();
};

export const inventoryValidator = [
    body('name', 'El nombre es obligatorio').notEmpty(),
    body('description', 'La descripción es obligatoria').notEmpty(),
    body('stock', 'El stock debe ser un número entero positivo').isInt({ min: 0 }),
    body('unitCost', 'El costo unitario debe ser un número positivo').isFloat({ min: 0 }),
    validateFields 
];