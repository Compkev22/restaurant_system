import Reservation from './reservation.model.js';

export const saveReservation = async (req, res) => {
    try {
        const data = req.body;
        const reservation = new Reservation(data);
        await reservation.save();
        return res.status(201).send({ success: true, message: 'Reservación creada' });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al reservar', err });
    }
};

export const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
        return res.send({ success: true, reservations });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al obtener', error: err.message });
    }
};

export const updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updated = await Reservation.findByIdAndUpdate(id, data, { new: true });
        return res.send({ success: true, message: 'Actualizado', updated });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al actualizar' });
    }
};

export const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        await Reservation.findByIdAndDelete(id);
        return res.send({ success: true, message: 'Reservación eliminada' });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error al eliminar' });
    }
};