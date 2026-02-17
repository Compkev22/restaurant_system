'use strict';

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    mesaId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Table',
        required: true
    },
    empleadoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    horaPedido: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'En Preparacion', 'Listo', 'Entregado', 'Cancelado'],
        default: 'Pendiente'
    },
    total: { 
        type: Number,
        default: 0
    }
}, { timestamps: true });

orderSchema.index({ estado: 1, horaPedido: 1 });

export default mongoose.model('Order', orderSchema);