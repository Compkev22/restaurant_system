'use strict';

import Order from './order.model.js';

export const getOrders = async (req, res) => {
    try {
        const { status } = req.query;
        const filter = status ? { estado: status } : {};

        const orders = await Order.find(filter).sort({ horaPedido: -1 });
        
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const order = await Order.findByIdAndUpdate(id, { estado }, { new: true });
        if (!order) return res.status(404).json({ success: false, message: 'Orden no encontrada' });

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};