'use strict';

import { Schema, model } from 'mongoose';

const orderSchema = Schema({
    branchId: {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    mesaId: {
        type: Schema.Types.ObjectId,
        ref: 'Table',
        required: true
    },
    empleadoId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
}, { versionKey: false, timestamps: true });

orderSchema.index({ estado: 1, horaPedido: 1 });

export default model('Order', orderSchema);