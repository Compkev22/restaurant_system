import Reservation from './reservation.model.js';

export const saveReservation = async (req, res) => {
    try {
        if (!['CLIENT', 'PLATFORM_ADMIN', 'BRANCH_ADMIN', 'EMPLOYEE'].includes(req.user.role)) {
            return res.status(403).send({ success: false, message: 'No autorizado' });
        }

        const data = req.body;

        if (req.user.role === 'CLIENT') {
            data.clientId = req.user._id;
        }

        const reservation = new Reservation(data);
        await reservation.save();
        return res.status(201).send({ success: true, message: 'Reservación creada' });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al reservar', err });
    }
};

export const getReservations = async (req, res) => {
    try {
        const filter = {};

        if (req.user.role === 'CLIENT') {
            filter.clientId = req.user._id;
        }
        const reservations = await Reservation.find(filter);
        return res.send({ success: true, reservations });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al obtener', error: err.message });
    }
};

export const updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const reservation = await Reservation.findById(id);
        if (!reservation) return res.status(404).send({ success: false, message: 'Reservación no encontrada' });

        if (req.user.role === 'CLIENT') {
            if (reservation.clientId?.toString() !== req.user._id.toString()) {
                return res.status(403).send({ success: false, message: 'No autorizado' });
            }
            if (reservation.status !== 'ACTIVE') {
                return res.status(400).send({ success: false, message: 'No puedes modificar una reservación inactiva' });
            }
        } else {
            if (!['PLATFORM_ADMIN', 'BRANCH_ADMIN', 'EMPLOYEE'].includes(req.user.role)) {
                return res.status(403).send({ success: false, message: 'No autorizado' });
            }
        }

        const updated = await Reservation.findByIdAndUpdate(id, data, { new: true });
        return res.send({ success: true, message: 'Actualizado', updated });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al actualizar' });
    }
};

export const deleteReservation = async (req, res) => {
    try {
        if (!['PLATFORM_ADMIN', 'BRANCH_ADMIN', 'EMPLOYEE'].includes(req.user.role)) {
            return res.status(403).send({ success: false, message: 'No autorizado' });
        }

        const { id } = req.params;
        await Reservation.findByIdAndDelete(id);
        return res.send({ success: true, message: 'Reservación eliminada' });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al eliminar' });
    }
};