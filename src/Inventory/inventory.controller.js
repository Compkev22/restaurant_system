import Inventory from './inventory.model.js';

export const saveInventory = async (req, res) => {
    try {
        const data = req.body;
        const inventory = new Inventory(data);
        await inventory.save();
        return res.status(201).send({ success: true, message: 'Insumo guardado', inventory });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al guardar', err });
    }
};

export const getInventory = async (req, res) => {
    try {
        const items = await Inventory.find();
        return res.send({ success: true, items });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al obtener inventario' });
    }
};
// EDITAR un insumo
export const updateInventory = async (req, res) => {
    try {
        const { id } = req.params; // Extraemos el ID de la URL
        const data = req.body;
        // Buscamos por ID y actualizamos con la nueva data
        const updatedItem = await Inventory.findByIdAndUpdate(id, data, { new: true });
        
        if (!updatedItem) return res.status(404).send({ success: false, message: 'Insumo no encontrado' });

        return res.send({ success: true, message: 'Insumo actualizado', updatedItem });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al actualizar', err: err.message });
    }
};
// ELIMINAR un insumo
export const deleteInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Inventory.findByIdAndDelete(id);

        if (!deletedItem) return res.status(404).send({ success: false, message: 'Insumo no encontrado' });

        return res.send({ success: true, message: 'Insumo eliminado físicamente' });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al eliminar', err: err.message });
    }
};
