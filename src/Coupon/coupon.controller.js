import Coupon from './coupon.model.js';

export const createCoupon = async (req, res) => {
    try {
        const { code, discountPercentage, expirationDate, usageLimit } = req.body;
        const upperCode = code.toUpperCase(); 

        // 1. Validar si ya existe un cupón con ese código
        const existing = await Coupon.findOne({ code: upperCode });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: `El código de cupón '${upperCode}' ya está registrado`
            });
        }

        // 2. Validar que la fecha no sea en el pasado
        if (new Date(expirationDate) < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'La fecha de expiración no puede ser anterior a hoy'
            });
        }

        const newCoupon = await Coupon.create({
            code: upperCode,
            discountPercentage,
            expirationDate,
            usageLimit
        });

        res.status(201).json({
            success: true,
            message: 'Cupón creado exitosamente',
            data: newCoupon
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el cupón',
            error: error.message
        });
    }
};

/**
 * Listar todos los cupones (Admin)
 */
export const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: coupons
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Actualizar cupón
 */
export const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Si el body trae un código, lo pasamos a mayúsculas antes de actualizar
        if (req.body.code) req.body.code = req.body.code.toUpperCase();

        const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, { 
            new: true, 
            runValidators: true 
        });

        if (!updatedCoupon) {
            return res.status(404).json({ success: false, message: 'Cupón no encontrado' });
        }

        res.status(200).json({
            success: true,
            message: 'Cupón actualizado',
            data: updatedCoupon
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * Desactivar cupón (Borrado lógico)
 */
export const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        // Cambiamos a INACTIVE para que el validador de órdenes ya no lo reconozca
        const coupon = await Coupon.findByIdAndUpdate(id, { status: 'INACTIVE' }, { new: true });

        if (!coupon) {
            return res.status(404).json({ success: false, message: 'Cupón no encontrado' });
        }

        res.status(200).json({
            success: true,
            message: 'Cupón desactivado exitosamente (Ahora es INACTIVE)',
            data: coupon
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};