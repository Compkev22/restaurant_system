import Table from './table.model.js';

export const saveTable = async (req, res) => {
    try {
        const data = req.body;
        const table = new Table(data);
        await table.save();
        return res.status(201).send({ success: true, message: 'Mesa registrada', table });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al registrar mesa', err });
    }
};

export const getTables = async (req, res) => {
    try {
        const tables = await Table.find();
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

export const deleteTable = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Table.findByIdAndDelete(id);
        
        if (!deleted) {
            return res.status(404).send({ 
                success: false, 
                message: 'Mesa no encontrada' 
            });
        }
        
        return res.send({ 
            success: true, 
            message: 'Mesa eliminada físicamente' 
        });
    } catch (err) {
        return res.status(500).send({ 
            success: false, 
            message: 'Error al eliminar la mesa', 
            err: err.message 
        });
    }
};