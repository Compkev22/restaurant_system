import Product from '../Product/product.model.js';
import Combo from '../Combo/combo.model.js';

export const getMenu = async (req, res) => {
    try {
        const products = await Product.find({ status: 'Disponible' });

        const combos = await Combo.find({ status: 'Disponible' });

        const menu = [
            ...products.map(product => ({
                _id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                type: 'Individual'
            })),
            ...combos.map(combo => ({
                _id: combo._id,
                name: combo.name,
                description: combo.description,
                price: combo.price,
                type: 'Combo'
            }))
        ];

        return res.status(200).send({
            success: true,
            message: 'Menú obtenido correctamente',
            total: menu.length,
            menu
        });

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: 'Error al obtener el menú',
            error: err.message
        });
    }
};