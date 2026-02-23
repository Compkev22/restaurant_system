'use strict';

import Table from './table.model.js';

export const saveTable = async (req, res) => {
    try {
        const data = req.body;
        const table = new Table(data);
        await table.save();
        return res.status(201).send({ success: true, message: 'Mesa registrada', table });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al registrar mesa', err: err.message });
    }
};

export const getTables = async (req, res) => {
    try {
        const { TableStatus } = req.query;
        const filter = { TableStatus: TableStatus || 'ACTIVE' };

        const tables = await Table.find(filter).populate('branchId', 'nombre');
        return res.send({ success: true, tables });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al obtener mesas' });
    }
};

export const updateTable = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updated = await Table.findByIdAndUpdate(id, data, { new: true });
        if (!updated) return res.status(404).send({ success: false, message: 'Mesa no encontrada' });
        return res.send({ success: true, message: 'Mesa actualizada', updated });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al actualizar', err: err.message });
    }
};

export const changeTableStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const table = await Table.findById(id);

        if (!table) return res.status(404).send({ success: false, message: 'Mesa no encontrada' });

        // Lógica de Soft Delete igual a las otras entidades
        table.TableStatus = table.TableStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        table.deletedAt = table.TableStatus === 'INACTIVE' ? new Date() : null;

        await table.save();

        return res.send({ 
            success: true, 
            message: `Estado de mesa cambiado a ${table.TableStatus}`, 
            table 
        });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al cambiar estado', err: err.message });
    }
};