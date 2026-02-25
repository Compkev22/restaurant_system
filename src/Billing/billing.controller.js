'use strict';

import Billing from './billing.model.js';
import Order from '../Order/order.model.js';
import Table from '../Table/table.model.js';

export const getBillings = async (req, res) => {
    try {
        const { page = 1, limit = 10, BillStatus } = req.query;

        const filter = {};
        if (BillStatus) filter.BillStatus = BillStatus;

        const billings = await Billing.find(filter)
            .populate('Order')
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .sort({ BillDate: -1 });

        const total = await Billing.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: billings,
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
            message: 'Error al obtener las facturas',
            error: error.message,
        });
    }
};

export const getBillingById = async (req, res) => {
    try {
        const { id } = req.params;

        const billing = await Billing.findById(id).populate('Order');

        if (!billing) {
            return res.status(404).json({
                success: false,
                message: 'Factura no encontrada',
            });
        }

        res.status(200).json({
            success: true,
            data: billing,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la factura',
            error: error.message,
        });
    }
};

export const createBilling = async (req, res) => {
    try {
        const { Order: orderId, BillPaymentMethod } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Orden no encontrada',
            });
        }

        const subtotal = order.total;
        const iva = subtotal * 0.12;
        const total = subtotal + iva;

        const billSerie = `FACTURA-${Date.now()}`;

        const billing = await Billing.create({
            branchId: order.branchId,
            Order: orderId,
            BillSerie: billSerie,
            BillSubtotal: subtotal,
            BillIVA: iva,
            BillTotal: total,
            BillPaymentMethod,
            BillStatus: 'GENERATED',
            BillDate: new Date()
        });

        res.status(201).json({
            success: true,
            message: 'Factura generada exitosamente',
            data: billing,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear la factura',
            error: error.message,
        });
    }
};

export const updateBilling = async (req, res) => {
    try {
        const { id } = req.params;

        const billing = await Billing.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!billing) {
            return res.status(404).json({
                success: false,
                message: 'Factura no encontrada',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Factura actualizada exitosamente',
            data: billing,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar la factura',
            error: error.message,
        });
    }
};

export const payBilling = async (req, res) => {
    try {
        const { id } = req.params;

        const billing = await Billing.findById(id).populate('Order');
        if (!billing || !billing.Order) {
            return res.status(404).json({
                success: false,
                message: 'Factura u orden no encontrada',
            });
        }

        if (billing.BillStatus === 'PAYED') {
            return res.status(400).json({
                success: false,
                message: 'La factura ya fue pagada',
            });
        }

        const order = await Order.findById(billing.Order._id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Orden no encontrada',
            });
        }

        if (order.estado !== 'Entregado') {
            return res.status(400).json({
                success: false,
                message: 'La orden debe estar entregada para poder pagar',
            });
        }

        const table = await Table.findById(order.mesaId);
        if (table) {
            table.availability = 'Disponible';
            await table.save();
        }

        billing.BillStatus = 'PAYED';
        await billing.save();

        res.status(200).json({
            success: true,
            message: 'Factura pagada y mesa liberada',
            data: {
                billing,
                order,
                table,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al pagar la factura',
            error: error.message,
        });
    }
};