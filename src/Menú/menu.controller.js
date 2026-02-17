'use strict';

import Product from '../Product/product.model.js';
import Combo from '../Combo/combo.model.js';

export const getFullMenu = async (req, res) => {
    try {
        // 1. Buscamos solo los productos que están "Disponibles"
        const products = await Product.find({ estado: 'Disponible' })
            .select('nombre precio categoria imagen_url estado');

        // 2. Buscamos los combos que están "ACTIVE"
        // Hacemos populate para ver qué trae cada combo
        const combos = await Combo.find({ ComboStatus: 'ACTIVE' })
            .populate({
                path: 'ComboList.productId',
                select: 'nombre precio'
            })
            .select('ComboName ComboDescription ComboPrice ComboDiscount imagen_url');

        // 3. Respondemos con ambas listas
        res.status(200).json({
            success: true,
            message: 'Menú cargado exitosamente',
            menu: {
                individualProducts: products,
                combos: combos
            },
            totalItems: products.length + combos.length
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al generar el menú',
            error: error.message
        });
    }
};