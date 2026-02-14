import { body, param } from 'express-validator';
import { checkValidators } from './check.validators.js';

export const validateCreateBilling = [
    body('BillSerie')
        .trim()
        .notEmpty()
        .withMessage('La serie de la factura es requerida')
        .isLength({ max: 20 })
        .withMessage('La serie de la factura no puede tener más de 20 caracteres'),

    body('BillDate')
        .toDate(),

    body('Order')
        /* .notEmpty()
        .withMessage('El pedido es requerido')
        .isMongoId()
        .withMessage('El pedido debe ser un ObjectId válido') */
        .optional(),
    //Quitar este .optional() y quitar el comentario de arriba cuando se una con pedido 

    body('BillSubtotal')
        .notEmpty()
        .withMessage('El subtotal es requerido')
        .isNumeric()
        .withMessage('El subtotal debe ser un número válido'),

    body('BillIVA')
        .notEmpty()
        .withMessage('El IVA es requerido')
        .isNumeric()
        .withMessage('El IVA debe ser un número válido'),

    body('BillTotal')
        .notEmpty()
        .withMessage('El total es requerido')
        .isNumeric()
        .withMessage('El total debe ser un número válido'),

    body('BillPaymentMethod')
        .optional()
        .isIn(['CASH', 'CARD'])
        .withMessage('Método de pago no válido'),

    body('BillStatus')
        .optional()
        .isIn(['ACTIVE', 'INACTIVE'])
        .withMessage('Estado no válido'),

    checkValidators,
];

export const validateUpdateBillingRequest = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId'),

    body('BillSerie')
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage('La serie no puede tener más de 20 caracteres'),

    body('BillDate')
        .optional()
        .isISO8601()
        .withMessage('La fecha debe tener un formato válido (YYYY-MM-DD)')
        .toDate(),

    body('pedido')
        .optional()
        .isMongoId()
        .withMessage('El pedido debe ser un ObjectId válido'),

    body('BillSubtotal')
        .optional()
        .isNumeric()
        .withMessage('El subtotal debe ser un número válido'),

    body('BillIVA')
        .optional()
        .isNumeric()
        .withMessage('El IVA debe ser un número válido'),

    body('BillTotal')
        .optional()
        .isNumeric()
        .withMessage('El total debe ser un número válido'),

    body('BillPaymentMethod')
        .optional()
        .isIn(['CASH', 'CARD'])
        .withMessage('Método de pago no válido'),

    body('BillStatus')
        .optional()
        .isIn(['ACTIVE', 'INACTIVE'])
        .withMessage('Estado no válido'),

    checkValidators,
];

export const validateBillingStatusChange = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId'),

    checkValidators,
];
export const validateGetBillingById = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido'),

    checkValidators,
];
