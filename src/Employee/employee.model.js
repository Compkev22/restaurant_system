'use strict';

import mongoose from 'mongoose';

const employeSchema = new mongoose.Schema({
    employeId: { // Tu ID personalizado (Numérico)
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
    },
    dpi: {
        type: Number,
        required: true,
        unique: true,
        // Validación para asegurar que tenga la longitud estándar de un DPI (13 dígitos)
        validate: {
            validator: function(v) {
                return v.toString().length === 13;
            },
            message: 'El DPI debe tener exactamente 13 dígitos'
        }
    },
    cargo: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'El cargo no puede exceder los 50 caracteres']
    },
    salario: {
        type: Number,
        required: true,
        min: [0, 'El salario no puede ser negativo']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Índice para búsquedas rápidas por nombre y cargo
employeSchema.index({ nombre: 1, cargo: 1 });

export default mongoose.model('Employe', employeSchema);