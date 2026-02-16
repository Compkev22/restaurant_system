import Combo from './combo.model.js';
import Product from '../Product/product.model.js';

export const getCombos = async (req, res) => {
    try {
        const { page = 1, limit = 10, ComboStatus } = req.query;

        const filter = {};
        if (ComboStatus) {
            filter.ComboStatus = ComboStatus;
        }

        const combos = await Combo.find(filter)
            .populate({
                    path: 'ComboList.productId',
                    select: 'nombre precio categoria estado'
                })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .sort({ ComboCreatedAt: -1 });

        const total = await Combo.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: combos,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalRecords: total,
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los combos',
            error: error.message,
        });
    }
};

export const getComboById = async (req, res) => {
    try {
        const { id } = req.params;

        const combo = await Combo.findById(id).populate({
            path: 'ComboList.productId',
            select: 'nombre precio categoria imagen_url estado'
        });
        
        if (!combo) {
            return res.status(404).json({
                success: false,
                message: 'Combo no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            data: combo,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el combo',
            error: error.message,
        });
    }
};

export const createCombo = async (req, res) => {
    try {
        const comboData = req.body;

        if (comboData.ComboList && comboData.ComboList.length > 0) {
            for (const item of comboData.ComboList) {
                const productExists = await Product.findById(item.productId);
                if (!productExists) {
                    return res.status(404).json({
                        success: false,
                        message: `El producto con ID ${item.productId} no existe`,
                    });
                }
            }
        }

        const combo = new Combo(comboData);
        await combo.save();

        res.status(201).json({
            success: true,
            message: 'Combo creado exitosamente',
            data: combo,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear el combo',
            error: error.message,
        });
    }
};

export const updateCombo = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Validar productos SOLO si vienen en el body para ser actualizados
        if (data.ComboList && Array.isArray(data.ingredientes)) {
            // Si el arreglo viene vacío, podrías lanzar un error dependiendo de tu regla de negocio
            if (data.ComboList.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'El combo no puede quedarse sin productos'
                });
            }

            // Validar la existencia de cada nuevo producto en la lista
            for (const item of data.ComboList) {
                const productExists = await Product.findById(item.productId);
                if (!productExists) {
                    return res.status(404).json({
                        success: false,
                        message: `El producto con ID ${item.productId} no existe. No se puede actualizar el combo.`
                    });
                }
            }
        }

        // runValidators valida los tipos de datos y enums del modelo
        const combo = await Combo.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        }).populate('ComboList.productId', 'nombre precio');

        if (!combo) {
            return res.status(404).json({
                success: false,
                message: 'Combo no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Combo actualizado y validado exitosamente',
            data: combo,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar el combo',
            error: error.message,
        });
    }
};

export const changeComboStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const combo = await Combo.findById(id);

        if (!combo) {
            return res.status(404).json({
                success: false,
                message: 'Combo no encontrado',
            });
        }

        combo.ComboStatus =
            combo.ComboStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

        await combo.save();

        res.status(200).json({
            success: true,
            message: `Combo ${combo.ComboStatus === 'ACTIVE' ? 'activado' : 'desactivado'} exitosamente`,
            data: combo,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cambiar el estado del combo',
            error: error.message,
        });
    }
};
