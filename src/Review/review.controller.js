'use strict';

import Review from './review.model.js';
import Order from '../Order/order.model.js';

/* -----------------------------------------
   CREAR RESEÑA
*/
export const createReview = async (req, res) => {
    try {
        const { orderId, rating, comment } = req.body;
        const customer = req.user._id;

        // Validar que la orden existe y está finalizada
        const order = await Order.findById(orderId);
        if (!order || order.estado !== 'Entregado') {
            return res.status(400).json({
                success: false,
                message: 'Solo se pueden reseñar órdenes entregadas'
            });
        }

        // Crear reseña
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
        res.status(500).json({
            success: false,
            message: 'Error al crear reseña',
            error: error.message
        });
    }
};

/* -----------------------------------------
   OBTENER RESEÑAS POR CLIENTE
 */
export const getMyReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ customer: req.user._id })
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
*/
export const getBranchReviews = async (req, res) => {
    try {
        const { branchId } = req.params;

        const reviews = await Review.find({ branch: branchId })
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
*/
export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        const review = await Review.findOneAndUpdate(
            { _id: id, customer: req.user._id },
            { rating, comment },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Reseña no encontrada'
            });
        }

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
   ELIMINAR RESEÑA
*/
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findOneAndDelete({
            _id: id,
            customer: req.user._id
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Reseña no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Reseña eliminada'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar reseña',
            error: error.message
        });
    }
};