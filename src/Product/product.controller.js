'use strict';

import Product from './product.model.js';
import Inventory from '../Inventory/inventory.model.js';

// Obtener productos
export const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, categoria, estado } = req.query;
        const filter = {};
        
        if (categoria) filter.categoria = categoria;
        if (estado) filter.estado = estado;

        const products = await Product.find(filter)
            .populate('ingredientes.inventoryId', 'name stock unitCost')
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

        // Valida que el arreglo de ingredientes exista
        if (!data.ingredientes || !Array.isArray(data.ingredientes) || data.ingredientes.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Un producto de KFC debe tener al menos un ingrediente del inventario' 
            });
        }

        // valida que cada ingrediente exista en la base de datos
        for (const item of data.ingredientes) {
            const inventoryExists = await Inventory.findById(item.inventoryId);
            if (!inventoryExists) {
                return res.status(404).json({ 
                    success: false, 
                    message: `El ingrediente con ID ${item.inventoryId} no existe en el inventario` 
                });
            }
        }

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

        // valida que los nuevos ID existan en el inventario
        if (data.ingredientes && Array.isArray(data.ingredientes)) {
            for (const item of data.ingredientes) {
                const inventoryExists = await Inventory.findById(item.inventoryId);
                if (!inventoryExists) {
                    return res.status(404).json({ 
                        success: false, 
                        message: `El ingrediente con ID ${item.inventoryId} no existe` 
                    });
                }
            }
        }

        if (req.file) {
            data.imagen_url = req.file.path;
        }

        // runValidators asegura que Mongoose valide el arreglo aunque sea una actualización
        const updatedProduct = await Product.findByIdAndUpdate(id, data, { 
            new: true, 
            runValidators: true 
        }).populate('ingredientes.inventoryId', 'name stock');

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};