'use strict';

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderId: { // ID de la Orden
        type: Number,
        required: true,
        unique: true
    },
    detallePedidoId: {
        type: Number,
        required: true
    },
    mesaId: { 
        type: Number,
        required: true
    },
    empleadoId: {
        type: Number,
        required: true,
        ref: 'Employe'
    },
    horaPedido: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'En Preparacion', 'Listo', 'Entregado', 'Cancelado'],
        default: 'Pendiente'
    }
}, { timestamps: true });

// Índices para cocina y administración
orderSchema.index({ estado: 1, horaPedido: 1 });

export default mongoose.model('Order', orderSchema);