'use strict';

import mongoose from 'mongoose';
import OrderRequest from './orderRequest.model.js';
import Order from '../Order/order.model.js';
import OrderDetail from '../OrderDetail/orderDetail.model.js';
import Product from '../Product/product.model.js';
import Combo from '../Combo/combo.model.js';


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

export const createOrderRequest = async (req, res) => {
    try {
        const { branch, orderType, deliveryAddress, items } = req.body;
        const customer = req.user._id;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Debe enviar un arreglo de productos o combos'
            });
        }

        // 1. Crear Order base
        const order = await Order.create({
            branchId: branch,
            orderType,
            total: 0,
            estado: 'Pendiente'
        });

        let totalGeneral = 0;

        // 2. Procesar cada item manualmente para evitar NaNs
        for (const item of items) {
            const { productoId, comboId, cantidad } = item;

            // Validación de integridad del item
            if (!cantidad || cantidad <= 0) {
                throw new Error(`La cantidad para el item ${productoId || comboId} debe ser mayor a 0`);
            }

            if ((!productoId && !comboId) || (productoId && comboId)) {
                throw new Error('Cada item debe tener exclusivamente productoId o comboId');
            }

            let precioUnitario = 0;

            if (productoId) {
                const productDB = await Product.findOne({ _id: productoId, ProductStatus: 'ACTIVE' });
                if (!productDB) throw new Error(`Producto no encontrado: ${productoId}`);
                
                precioUnitario = productDB.precio || 0;
                const subtotalItem = precioUnitario * cantidad;

                await OrderDetail.create({
                    order: order._id,
                    productoId,
                    cantidad: Number(cantidad),
                    precio: precioUnitario,
                    subtotal: subtotalItem
                });
                totalGeneral += subtotalItem;
            }

            if (comboId) {
                const comboDB = await Combo.findOne({ _id: comboId, ComboStatus: 'ACTIVE' });
                if (!comboDB) throw new Error(`Combo no encontrado: ${comboId}`);

                precioUnitario = (comboDB.ComboPrice || 0) - (comboDB.ComboDiscount || 0);
                const subtotalItem = precioUnitario * cantidad;

                await OrderDetail.create({
                    order: order._id,
                    comboId,
                    cantidad: Number(cantidad),
                    precio: precioUnitario,
                    subtotal: subtotalItem
                });
                totalGeneral += subtotalItem;
            }
        }

        // 3. Actualizar el total final en la Orden
        order.total = totalGeneral;
        await order.save();

        // 4. Crear el OrderRequest vinculado
        const orderRequest = await OrderRequest.create({
            customer,
            branch,
            order: order._id,
            orderType,
            deliveryAddress: orderType === 'DELIVERY' ? deliveryAddress : undefined,
            orderStatus: 'Pendiente',
            total: totalGeneral
        });

        res.status(201).json({
            success: true,
            message: 'Order request creada correctamente',
            data: orderRequest
        });

    } catch (error) {
        // Si algo falla, intentamos limpiar la orden huérfana (opcional pero recomendado)
        res.status(500).json({
            success: false,
            message: 'Error al procesar el pedido',
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
        const { orderStatus } = req.body; // Se espera: 'En Preparacion', 'Listo', etc.

        const orderRequest = await OrderRequest.findById(id);

        if (!orderRequest) {
            return res.status(404).json({
                success: false,
                message: 'Order request no encontrada'
            });
        }

        // Bloquear si ya está finalizada
        if (orderRequest.orderStatus === 'Cancelado' || orderRequest.orderStatus === 'Entregado') {
            return res.status(400).json({
                success: false,
                message: 'No se puede modificar un pedido finalizado'
            });
        }

        // Mapeo de transiciones válidas usando tus estados de Order
        const validTransitions = {
            'Pendiente': ['En Preparacion', 'Cancelado'],
            'En Preparacion': ['Listo'],
            'Listo': ['Entregado'],
            'Entregado': [],
            'Cancelado': []
        };

        const allowed = validTransitions[orderRequest.orderStatus];

        if (!allowed || !allowed.includes(orderStatus)) {
            return res.status(400).json({
                success: false,
                message: `Transición inválida de ${orderRequest.orderStatus} a ${orderStatus}`
            });
        }

        // Actualizar OrderRequest
        orderRequest.orderStatus = orderStatus;
        await orderRequest.save();

        // Sincronizar con Order interna (Usando los mismos estados)
        await Order.findByIdAndUpdate(orderRequest.order, {
            estado: orderStatus
        });

        const updatedOrder = await OrderRequest.findById(id)
            .populate('customer')
            .populate('order');

        res.status(200).json({
            success: true,
            message: 'Estado del pedido actualizado',
            data: updatedOrder
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

        if (orderRequest.orderStatus !== 'Pendiente') {
            return res.status(400).json({
                success: false,
                message: 'Solo se pueden cancelar pedidos en estado Pendiente'
            });
        }

        orderRequest.orderStatus = 'Cancelado';
        await orderRequest.save();

        await Order.findByIdAndUpdate(orderRequest.order, {
            estado: 'Cancelado'
        });

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