'use strict';

import Review from './review.model.js';
import Order from '../Order/order.model.js';

/* -----------------------------------------
   CREAR RESEÑA
------------------------------------------*/
export const createReview = async (req, res) => {
    try {
        const { orderId, rating, comment } = req.body;
        const customer = req.user._id;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Orden no encontrada'
            });
        }

        // 🔐 Validar que la orden pertenece al cliente
        if (order.customer.toString() !== customer.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No puedes reseñar una orden que no es tuya'
            });
        }

        if (order.estado !== 'Entregado') {
            return res.status(400).json({
                success: false,
                message: 'Solo se pueden reseñar órdenes entregadas'
            });
        }

        const review = await Review.create({
            customer,
            order: orderId,
            branch: order.branchId,
            rating,
            comment
        });

        res.status(201).json({
            success: true,
            message: 'Reseña creada',
            data: review
        });

    } catch (error) {

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Ya has dejado una reseña para esta orden'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error al crear reseña',
            error: error.message
        });
    }
};


/* -----------------------------------------
   OBTENER RESEÑAS DEL CLIENTE
------------------------------------------*/
export const getMyReviews = async (req, res) => {
    try {
        const reviews = await Review.find({
            customer: req.user._id,
            isDeleted: false
        })
            .populate('order', 'estado total')
            .populate('branch', 'name');

        res.status(200).json({
            success: true,
            data: reviews
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener reseñas',
            error: error.message
        });
    }
};


/* -----------------------------------------
   OBTENER RESEÑAS POR SUCURSAL
------------------------------------------*/
export const getBranchReviews = async (req, res) => {
    try {
        const { branchId } = req.params;

        const reviews = await Review.find({
            branch: branchId,
            isDeleted: false
        })
            .populate('customer', 'UserName UserSurname')
            .populate('order', 'estado total')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: reviews
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener reseñas de la sucursal',
            error: error.message
        });
    }
};


/* -----------------------------------------
   ACTUALIZAR RESEÑA
------------------------------------------*/
export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        const review = await Review.findOne({
            _id: id,
            customer: req.user._id,
            isDeleted: false
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Reseña no encontrada'
            });
        }

        review.rating = rating ?? review.rating;
        review.comment = comment ?? review.comment;

        await review.save();

        res.status(200).json({
            success: true,
            message: 'Reseña actualizada',
            data: review
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar reseña',
            error: error.message
        });
    }
};


/* -----------------------------------------
   ELIMINAR RESEÑA (SOFT DELETE)
------------------------------------------*/
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findOne({
            _id: id,
            customer: req.user._id,
            isDeleted: false
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Reseña no encontrada'
            });
        }

        review.isDeleted = true;
        await review.save();

        res.status(200).json({
            success: true,
            message: 'Reseña eliminada correctamente'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar reseña',
            error: error.message
        });
    }
};