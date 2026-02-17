import { Schema, model } from 'mongoose';

const detalleInventarioSchema = Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    inventoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Inventory',
        required: true
    },
    cantidadUsada: {
        type: Number,
        required: true
    }
}, { versionKey: false });

export default model('DetalleInventario', detalleInventarioSchema);