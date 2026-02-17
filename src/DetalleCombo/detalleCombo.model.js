import { Schema, model } from 'mongoose';

const detalleComboSchema = Schema({
    comboId: {
        type: Schema.Types.ObjectId,
        ref: 'Combo',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
        default: 1
    }
}, { versionKey: false });

export default model('DetalleCombo', detalleComboSchema);