'use strict';

import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: { 
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        default: 'Guatemala'
    },
    zone: { 
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    tableCapacity: { 
        type: Number,
        default: 0
   },
    hasDriveThru: {
        type: Boolean,
        default: true
    },
    branchStatus: { 
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

branchSchema.index({ zone: 1, name: 1 });

export default mongoose.model('Branch', branchSchema);