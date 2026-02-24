'use strict';

import Order from './order.model.js';
import OrderDetail from '../OrderDetail/orderDetail.model.js';

export const getOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10, estado } = req.query;

        const filter = {};
        if (estado) {
            filter.estado = estado;
        }

        const orders = await Order.find(filter)
            .populate('mesaId', 'numero capacidad')
            .populate('empleadoId', 'name surname')
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .sort({ horaPedido: -1 });

        const total = await Order.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: orders,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las órdenes',
            error: error.message,
        });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id)
            .populate('mesaId')
            .populate('empleadoId');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Orden no encontrada',
            });
        }

        const items = await OrderDetail.find({ order: id })
            .populate('productoId')
            .populate('comboId')
            .sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            data: {
                order,
                items,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la orden',
            error: error.message,
        });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { branchId, mesaId, empleadoId } = req.body;

        const order = await Order.create({
            branchId,
            mesaId,
            empleadoId,
            total: 0,
        });

        res.status(201).json({
            success: true,
            message: 'Orden creada exitosamente',
            data: order,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear la orden',
            error: error.message,
        });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        })
            .populate('mesaId')
            .populate('empleadoId')
            .populate('branchId');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Orden no encontrada',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Orden actualizada exitosamente',
            data: order,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar la orden',
            error: error.message,
        });
    }
};

export const changeOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Orden no encontrada',
            });
        }

        order.estado = estado;
        await order.save();

        res.status(200).json({
            success: true,
            message: 'Estado de la orden actualizado',
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cambiar el estado de la orden',
            error: error.message,
        });
    }
};
