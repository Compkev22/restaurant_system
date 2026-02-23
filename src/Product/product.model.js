'use strict';

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    ingredientes: [{
        inventoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Inventory',
            required: true
        },
        cantidadUsada: {
            type: Number,
            required: true,
            default: 1 // 1 pan, 2 lechugas, 2 carnes, etc....
        }
    }],
    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
    },
    categoria: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'La categoría no puede exceder los 50 caracteres']
    },
    precio: {
        type: Number,
        required: true,
        min: [0, 'El precio no puede ser negativo']
    },
    imagen_url: {
        type: String,
        default: 'products/default-product.png'
    },
    estado: {
        type: String,
        enum: ['Disponible', 'Agotado', 'Descontinuado'],
        default: 'Disponible'
    }
}, { timestamps: true });

// Índice para búsqueda por nombre y filtrado por categoría/estado
productSchema.index({ nombre: 1, categoria: 1, inventoryId: 1 });

export default mongoose.model('Product', productSchema);