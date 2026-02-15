import { Router } from 'express';
import { saveReservation, getReservations, updateReservation, deleteReservation } from './reservation.controller.js';
import { reservationValidator } from './reservation.validator.js';

const api = Router();

api.post('/save', reservationValidator, saveReservation);
api.get('/', getReservations);
api.put('/:id', reservationValidator, updateReservation);
api.delete('/:id', deleteReservation);

export default api;