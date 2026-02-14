'use strict';

import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
    branchId: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true
    },
    municipio: {
        type: String,
        required: true,
        default: 'Guatemala'
    },
    zona: {
        type: Number,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    capacidadMesas: {
        type: Number,
        default: 0
    },
    tieneAutoservicio: {
        type: Boolean,
        default: true
    },
    estado: {
        type: String,
        enum: ['Activa', 'Inactiva'],
        default: 'Activa'
    }
}, { timestamps: true });

branchSchema.index({ zona: 1, nombre: 1 });

export default mongoose.model('Branch', branchSchema);