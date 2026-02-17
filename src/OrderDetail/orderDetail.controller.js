'use strict';

import Order from '../../../../Users/Informatica/Documents/restaurant_system-ft-RobertoMilian/restaurant_system-ft-RobertoMilian/src/Order/order.model.js';
import OrderDetail from './orderDetail.model.js';

/**
 * Crear item de orden
 */
export const createOrderDetail = async (req, res) => {
    try {
        const { order, productoId, comboId, cantidad, precio } = req.body;

        const existingOrder = await Order.findById(order);
        if (!existingOrder) {
            return res.status(404).json({
                success: false,
                message: 'Orden no encontrada'
            });
        }

        const subtotal = cantidad * precio;

        const detail = await OrderDetail.create({
            order,
            productoId,
            comboId,
            cantidad,
            precio,
            subtotal
        });

        await Order.findByIdAndUpdate(order, {
            $inc: { total: subtotal }
        });

        res.status(201).json({
            success: true,
            message: 'Item creado correctamente',
            data: detail
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear item',
            error: error.message
        });
    }
};

/**
 * Obtener items por orden
 */
export const getOrderDetailsByOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const details = await OrderDetail.find({ order: orderId })
            .populate('productoId')
            .populate('comboId')
            .sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            data: details
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener items',
            error: error.message
        });
    }
};

/**
 * Actualizar item
 */
export const updateOrderDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await OrderDetail.findById(id);
        if (!detail) {
            return res.status(404).json({
                success: false,
                message: 'Item no encontrado'
            });
        }

        const cantidad = req.body.cantidad ?? detail.cantidad;
        const precio = req.body.precio ?? detail.precio;
        const nuevoSubtotal = cantidad * precio;
        const diferencia = nuevoSubtotal - detail.subtotal;

        detail.set({
            ...req.body,
            subtotal: nuevoSubtotal
        });

        await detail.save();

        await Order.findByIdAndUpdate(detail.order, {
            $inc: { total: diferencia }
        });

        res.status(200).json({
            success: true,
            message: 'Item actualizado',
            data: detail
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar item',
            error: error.message
        });
    }
};

/**
 * Eliminar item
 */
export const deleteOrderDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await OrderDetail.findById(id);
        if (!detail) {
            return res.status(404).json({
                success: false,
                message: 'Item no encontrado'
            });
        }

        await Order.findByIdAndUpdate(detail.order, {
            $inc: { total: -detail.subtotal }
        });

        await detail.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Item eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar item',
            error: error.message
        });
    }
};
