import { Router } from 'express';
import { saveReservation, getReservations, updateReservation, toggleReservationStatus } from './reservation.controller.js';
import { reservationValidator } from './reservation.validator.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const api = Router();

api.post('/', validateJWT, reservationValidator, saveReservation);
api.get('/', validateJWT, getReservations);
api.put('/:id', validateJWT, updateReservation);
api.patch('/:id/status', validateJWT, toggleReservationStatus);

export default api;