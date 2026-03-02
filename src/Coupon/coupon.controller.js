'use strict';

import Coupon from './coupon.model.js';

/**
 * Crear un nuevo cupón
 */
export const createCoupon = async (req, res) => {
    try {
        const { code, discountPercentage, expirationDate, usageLimit } = req.body;

        // Validar que la fecha no sea en el pasado
        if (new Date(expirationDate) < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'La fecha de expiración no puede ser anterior a hoy'
            });
        }

        const newCoupon = await Coupon.create({
            code,
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
 * Eliminar (o desactivar) cupón
 */
export const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        // En lugar de borrar, lo pasamos a INACTIVE por historial
        const coupon = await Coupon.findByIdAndUpdate(id, { status: 'INACTIVE' }, { new: true });

        if (!coupon) {
            return res.status(404).json({ success: false, message: 'Cupón no encontrado' });
        }

        res.status(200).json({
            success: true,
            message: 'Cupó desactivado exitosamente'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};