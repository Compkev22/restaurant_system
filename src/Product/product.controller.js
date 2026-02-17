'use strict';

import Product from './product.model.js';

// ==========================================
// 1. OBTENER PRODUCTOS (GET)
// ==========================================
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

// ==========================================
// 2. CREAR PRODUCTO (POST) - Lógica Roberto
// ==========================================
export const createProduct = async (req, res) => {
    try {
        const data = req.body;

        // Ya no validamos ingredientes aquí porque se hacen en DetalleInventario
        if (req.file) {
            data.imagen_url = req.file.path;
        }

        const product = new Product(data);
        await product.save();

        res.status(201).json({ 
            success: true, 
            message: 'Producto base creado exitosamente', 
            data: product 
        });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al crear producto', error: error.message });
    }
};

// ==========================================
// 3. ACTUALIZAR PRODUCTO (PUT)
// ==========================================
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Si suben una nueva foto
        if (req.file) {
            data.imagen_url = req.file.path;
        }

        // Actualizamos sin preocuparnos por los ingredientes (ahora son independientes)
        const updatedProduct = await Product.findByIdAndUpdate(id, data, { 
            new: true, 
            runValidators: true 
        });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }

        res.status(200).json({ 
            success: true, 
            message: 'Producto actualizado correctamente', 
            data: updatedProduct 
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// ==========================================
// 4. ELIMINAR PRODUCTO (DELETE)
// ==========================================
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }

        res.status(200).json({ success: true, message: 'Producto eliminado físicamente' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};