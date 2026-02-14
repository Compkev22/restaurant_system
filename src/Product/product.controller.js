'use strict';

import Product from './product.model.js';

// Obtener productos
export const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, categoria, estado } = req.query;
        const filter = {};
        
        if (categoria) filter.categoria = categoria;
        if (estado) filter.estado = estado;

        const products = await Product.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ nombre: 1 });

        const total = await Product.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: products,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const data = req.body;

        // Si Cloudinary subió el archivo, asignamos la URL segura al modelo
        if (req.file) {
            data.imagen_url = req.file.path;
        }

        const product = new Product(data);
        await product.save();

        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Si se está enviando una nueva imagen en la actualización
        if (req.file) {
            data.imagen_url = req.file.path;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
        
        if (!updatedProduct) return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};