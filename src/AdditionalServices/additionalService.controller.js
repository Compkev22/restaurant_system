'use strict';

import AdditionalService from './additionalService.model.js';

export const getAdditionalServices = async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;

        const filter = {};
        if (status) {
            filter.status = status;
        }

        const services = await AdditionalService.find(filter)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await AdditionalService.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: services,
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
            message: 'Error al obtener los servicios adicionales',
            error: error.message,
        });
    }
};

export const createAdditionalService = async (req, res) => {
    try {
        const service = new AdditionalService(req.body);
        await service.save();

        res.status(201).json({
            success: true,
            message: 'Servicio adicional creado exitosamente',
            data: service,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear el servicio adicional',
            error: error.message,
        });
    }
};

export const updateAdditionalService = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await AdditionalService.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Servicio adicional no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Servicio adicional actualizado exitosamente',
            data: service,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar el servicio adicional',
            error: error.message,
        });
    }
};

export const changeAdditionalServiceStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await AdditionalService.findById(id);

        if (!service) return res.status(404).json({ success: false, message: 'Servicio adicional no encontrado' });

        service.status = service.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        service.deletedAt = service.status === 'INACTIVE' ? new Date() : null;

        await service.save();

        return res.json({
            success: true,
            message: `Estado del servicio cambiado a ${service.status}`,
            data: service
        });

    } catch (err) {
        return res.status(500).json({ success: false, message: 'Error al cambiar estado', error: err.message });
    }
};