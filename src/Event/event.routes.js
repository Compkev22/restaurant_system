import { Router } from 'express';
import {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    changeEventStatus
} from './event.controller.js';

import {
    validateCreateEvent,
    validateUpdateEventRequest,
    validateEventStatusChange,
    validateGetEventById
} from '../../middlewares/event-validator.js';

const router = Router();

router.get('/', getEvents);

router.get(
    '/:id',
    validateGetEventById,
    getEventById
);

router.post(
    '/',
    validateCreateEvent,
    createEvent
);

router.put(
    '/:id',
    validateUpdateEventRequest,
    updateEvent
);

router.put(
    '/:id/status',
    validateEventStatusChange,
    changeEventStatus
);

export default router;
