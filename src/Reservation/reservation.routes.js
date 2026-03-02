import { Router } from 'express';
import { saveReservation, getReservations, updateReservation, deleteReservation } from './reservation.controller.js';
import { reservationValidator } from './reservation.validator.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const api = Router();

api.post('/', validateJWT, reservationValidator, saveReservation);
api.get('/', validateJWT, getReservations);
api.put('/:id', validateJWT, reservationValidator, updateReservation);
api.delete('/:id', validateJWT, deleteReservation);

export default api;