import Menu from './menu.model.js';

export const saveMenu = async (req, res) => {
    try {
        const data = req.body;
        const item = new Menu(data);
        await item.save();
        return res.status(201).send({ success: true, message: 'Menú creado', item });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al guardar', err });
    }
};

export const getMenu = async (req, res) => {
    try {
        const items = await Menu.find();
        return res.send({ success: true, items });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al obtener menú' });
    }
};

// ESTAS SON LAS QUE TE FALTABAN:
export const updateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updated = await Menu.findByIdAndUpdate(id, data, { new: true });
        if (!updated) return res.status(404).send({ success: false, message: 'Platillo no encontrado' });
        return res.send({ success: true, message: 'Menú actualizado', updated });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al actualizar', err: err.message });
    }
};

export const deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Menu.findByIdAndDelete(id);
        if (!deleted) return res.status(404).send({ success: false, message: 'Platillo no encontrado' });
        return res.send({ success: true, message: 'Platillo eliminado' });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al eliminar', err: err.message });
    }
};