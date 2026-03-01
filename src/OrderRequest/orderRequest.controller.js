'use strict';

import OrderRequest from './orderRequest.model.js';
import Order from '../Order/order.model.js';

/**
 * CLIENT crea solicitud de pedido
 * (TAKEAWAY / DELIVERY)
 */
export const createOrderRequest = async (req, res) => {
    try {

        const { branch, orderType, deliveryAddress } = req.body;

        // usuario obtenido desde JWT
        const customer = req.user._id;

        // Crear orden base del sistema
        const order = await Order.create({
            branchId: branch,
            orderType,
            total: 0,
            estado: 'Pendiente'
        });

        // Crear solicitud del pedido
        const orderRequest = await OrderRequest.create({
            customer,
            branch,
            order: order._id,
            orderType,
            deliveryAddress:
                orderType === 'DELIVERY'
                    ? deliveryAddress
                    : undefined
        });

        res.status(201).json({
            success: true,
            message: 'Order request creada',
            data: orderRequest
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating order request',
            error: error.message
        });
    }
};

/**
 * CLIENTE obtiene sus pedidos
 */
export const getMyOrderRequests = async (req, res) => {
    try {

        const orders = await OrderRequest.find({
            customer: req.user._id
        })
            .populate('order')
            .populate('branch');

        res.status(200).json({
            success: true,
            data: orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
};

/**
 * EMPLEADOS / ADMIN SUCURSAL
 * Ver pedidos de una sucursal
 */
export const getBranchOrderRequests = async (req, res) => {
    try {

        const { branchId } = req.params;

        const orders = await OrderRequest.find({
            branch: branchId
        })
            .populate('customer', 'UserName UserSurname UserEmail')
            .populate('order');

        res.status(200).json({
            success: true,
            data: orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching branch orders',
            error: error.message
        });
    }
};

/**
 * PERSONAL actualiza estado del pedido
 */
export const updateOrderRequestStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const { orderStatus } = req.body;

        const orderRequest = await OrderRequest.findByIdAndUpdate(
            id,
            { orderStatus },
            {
                new: true,
                runValidators: true
            }
        )
            .populate('customer')
            .populate('order');

        if (!orderRequest) {
            return res.status(404).json({
                success: false,
                message: 'Order request no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Estado del pedido actualizado',
            data: orderRequest
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating status',
            error: error.message
        });
    }
};

/**
 * CLIENTE cancela su pedido
 */
export const cancelOrderRequest = async (req, res) => {
    try {

        const { id } = req.params;

        const orderRequest = await OrderRequest.findOne({
            _id: id,
            customer: req.user._id
        });

        if (!orderRequest) {
            return res.status(404).json({
                success: false,
                message: 'Pedido no encontrado'
            });
        }

        orderRequest.orderStatus = 'CANCELLED';
        await orderRequest.save();

        res.status(200).json({
            success: true,
            message: 'Pedido cancelado'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error cancelling order',
            error: error.message
        });
    }
};