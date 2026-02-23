'use strict';

import Event from './event.model.js';
export const getEvents = async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;

        const filter = {};

        if (status) {
            filter.status = status;
        }

        const events = await Event.find(filter)
            .populate('branchId')
            .populate('clientId')
            .populate('tables')
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await Event.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: events,
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
            message: 'Error al obtener los eventos',
            error: error.message,
        });
    }
};


export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id)
            .populate('branchId')
            .populate('clientId')
            .populate('tables');

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Evento no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            data: event,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el evento',
            error: error.message,
        });
    }
};

export const createEvent = async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();

        const populatedEvent = await Event.findById(event._id)
            .populate('branchId')
            .populate('clientId')
            .populate('tables');

        res.status(201).json({
            success: true,
            message: 'Evento creado exitosamente',
            data: populatedEvent,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear el evento',
            error: error.message,
        });
    }
};


export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )
<<<<<<< HEAD
            .populate('branchId')
            .populate('clientId')
            .populate('tables');
=======
        .populate('branchId')
        .populate('clientId')
        .populate('tables');
>>>>>>> 3a710b3 (T69/ Implementar Soft Delete a la entidad Branch)

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Evento no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Evento actualizado exitosamente',
            data: event,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar el evento',
            error: error.message,
        });
    }
};


export const changeEventStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Evento no encontrado',
            });
        }

        event.status = status;

        await event.save();

        res.status(200).json({
            success: true,
            message: 'Estado del evento actualizado exitosamente',
            data: event,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cambiar el estado del evento',
            error: error.message,
        });
    }
};