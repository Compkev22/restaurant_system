'use strict';

import DetalleInventario from './detalleInventario.model.js';

export const saveDetalleInventario = async (req, res) => {
    try {
        const data = req.body;
        const detalle = new DetalleInventario(data);
        await detalle.save();
        
        return res.status(201).send({ 
            success: true, 
            message: 'Ingrediente vinculado al producto correctamente', 
            detalle 
        });
    } catch (err) {
        return res.status(500).send({ 
            success: false, 
            message: 'Error al vincular ingrediente', 
            err: err.message 
        });
    }
};

export const getDetallesByProduct = async (req, res) => {
    try {
        const { id } = req.params; // ID del producto
        const detalles = await DetalleInventario.find({ productId: id })
            .populate('inventoryId', 'name unitCost');
            
        return res.send({ success: true, detalles });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al obtener los detalles' });
    }
};

export const deleteDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await DetalleInventario.findByIdAndDelete(id);

        if (!deleted) return res.status(404).send({ success: false, message: 'Relación no encontrada' });

        return res.send({ success: true, message: 'Ingrediente quitado del producto' });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al eliminar', err });
    }
}