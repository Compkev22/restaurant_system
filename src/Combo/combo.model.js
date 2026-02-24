'use strict';

import mongoose from "mongoose";

const comboSchema = new mongoose.Schema({
    ComboName: {
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true,
        maxlength: [100, 'El nombre no puede tener más de 100 caracteres']
    },
    ComboDescription: {
        type: String,
        required: [true, 'La descripción es requerida'],
        trim: true,
        maxlength: [100, 'La descripción no puede tener más de 100 caracteres']
    },
    ComboPrice: {
        type: Number,
        required: [true, 'El precio es requerido'],
    },
    ComboDiscount: {
        type: String,
        required: [true, 'El descuento es requerido'],
        trim: true
    },
    ComboStatus: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    },
    // Agregamos deletedAt para manejar el Soft Delete
    deletedAt: {
        type: Date,
        default: null
    },
    ComboCreatedAt: {
        type: Date,
        default: Date.now
    }
});

comboSchema.index({ ComboName: 1 });

export default mongoose.model("Combo", comboSchema);