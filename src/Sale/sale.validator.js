import { body, validationResult } from 'express-validator';

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

export const saleValidator = [
    body('product', 'El nombre del producto es obligatorio').notEmpty(),
    body('quantity', 'La cantidad debe ser un número').isNumeric(),
    body('employee', 'El nombre del empleado es obligatorio').notEmpty(),
    body('total', 'El total debe ser un número').isNumeric(),
    validateFields 
];