'use strict';

import mongoose, { Schema } from "mongoose";

const billingSchema = new mongoose.Schema({
    BillSerie: {
        type: String,
        required: [true, 'La serie de la factura es requerida'],
        trim: true,
        maxlength: [20, 'La serie de la factura no puede tener más de 20 caracteres'],
    },
    BillDate: {
        type: Date,
        default: Date.now
    },
    Order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        //required: [true, 'El pedido es requerido'], //Quitar el comentario de aquí cuando se unan :D
        default: null
    },
    BillSubtotal: {
        type: Number
    },
    BillIVA: {
        type: Number
    },
    BillTotal: {
        type: Number
    },
    BillPaymentMethod: {
        type: String,
        enum: ['CASH', 'CARD']
    },
    BillStatus: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    }
});

billingSchema.index({ BillSerie: 1 });

export default mongoose.model("Billing", billingSchema);
