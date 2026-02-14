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

export const getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find();
        return res.send({
            success: true,
            message: 'Inventario recuperado con éxito',
            inventory
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: 'Error al obtener el inventario',
            error: err.message
        });
    }
};