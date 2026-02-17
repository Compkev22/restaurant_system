import DetalleCombo from './detalleCombo.model.js';

export const addProductToCombo = async (req, res) => {
    try {
        const data = req.body;
        const detalle = new DetalleCombo(data);
        await detalle.save();
        
        return res.status(201).send({
            success: true,
            message: 'Producto agregado al detalle del combo',
            detalle
        });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al agregar detalle', err });
    }
};

export const getItemsByCombo = async (req, res) => {
    try {
        const { id } = req.params; // Aquí recibe el ID del combo que pusiste en Postman
        const items = await DetalleCombo.find({ comboId: id })
            .populate('productId', 'nombre precio'); // Esto trae el nombre y precio del producto
        
        if (items.length === 0) {
            return res.status(404).send({ success: false, message: 'No hay productos en este combo' });
        }

        return res.send({ success: true, items });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al obtener items del combo', err });
    }
};