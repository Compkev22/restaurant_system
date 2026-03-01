'use strict';

import mongoose from 'mongoose';

const orderRequestSchema = new mongoose.Schema({

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },

    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },

    orderType: {
        type: String,
        enum: ['TAKEAWAY', 'DELIVERY'],
        required: true
    },

    orderStatus: {
        type: String,
        enum: [
            'CREATED',
            'CONFIRMED',
            'PREPARING',
            'READY',
            'DELIVERED',
            'CANCELLED'
        ],
        default: 'CREATED'
    },

    deliveryAddress: {
        type: String
    },

    total: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

export default mongoose.model('OrderRequest', orderRequestSchema);