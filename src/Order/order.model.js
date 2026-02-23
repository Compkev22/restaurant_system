'use strict';

<<<<<<< HEAD
import { Schema, mongoose } from 'mongoose';

const orderSchema = new Schema({
=======
import { Schema, model } from 'mongoose';

const orderSchema = Schema({
>>>>>>> e448b61 (T70/ Finalizar configuraciones y limpieza de rutas tras implementar Soft Delete)
    branchId: {
        type: Schema.Types.ObjectId, 
        ref: 'Branch',
        required: true
    },
<<<<<<< HEAD
    mesaId: {
        type: mongoose.Schema.Types.ObjectId,
=======
    mesaId: { 
        type: Schema.Types.ObjectId, 
>>>>>>> e448b61 (T70/ Finalizar configuraciones y limpieza de rutas tras implementar Soft Delete)
        ref: 'Table',
        required: true
    },
    empleadoId: {
        type: Schema.Types.ObjectId, 
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
}, { versionKey: false, timestamps: true });

orderSchema.index({ estado: 1, horaPedido: 1 });

export default model('Order', orderSchema);