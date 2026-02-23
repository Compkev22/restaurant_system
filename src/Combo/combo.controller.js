'use strict';

import Combo from './combo.model.js';

export const getCombos = async (req, res) => {
    try {
        const { page = 1, limit = 10, ComboStatus } = req.query;

        const filter = {};
        // Filtro por defecto para Soft Delete
        filter.ComboStatus = ComboStatus || 'ACTIVE';

        const combos = await Combo.find(filter)
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

        const combo = await Combo.findById(id);

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

        const combo = await Combo.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!combo) {
            return res.status(404).json({
                success: false,
                message: 'Combo no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Combo actualizado exitosamente',
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

        // Alternar estado
        combo.ComboStatus =
            combo.ComboStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        
        // Manejo de fecha de eliminación
        combo.deletedAt = combo.ComboStatus === 'INACTIVE' ? new Date() : null;

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