'use strict';

import Event from './event.model.js';

export const getEvents = async (req, res) => {
    try {
        const { page = 1, limit = 10, EventStatus } = req.query;

        const filter = {};
        if (EventStatus) {
            filter.EventStatus = EventStatus;
        }

        const events = await Event.find(filter)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .sort({ EventCreatedAt: -1 });

        const total = await Event.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: events,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
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

        const event = await Event.findById(id).populate('Combo');

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
        const eventData = req.body;

        const event = new Event(eventData);
        await event.save();

        res.status(201).json({
            success: true,
            message: 'Evento creado exitosamente',
            data: event,
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

        const event = await Event.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        }).populate('Combo');

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

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Evento no encontrado',
            });
        }

        event.EventStatus =
            event.EventStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

        await event.save();

        res.status(200).json({
            success: true,
            message: `Evento ${event.EventStatus === 'ACTIVE' ? 'activado' : 'desactivado'} exitosamente`,
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
