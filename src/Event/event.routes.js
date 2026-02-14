import { Router } from 'express';
import {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    changeEventStatus
} from './event.controller.js';

const router = Router();

router.get('/', getEvents);

router.get(
    '/:id',
    getEventById
);

router.post(
    '/',
    createEvent
);

router.put(
    '/:id',
    updateEvent
);

router.put(
    '/:id/status',
    changeEventStatus
);

export default router;
