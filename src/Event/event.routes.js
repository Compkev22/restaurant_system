import { Router } from 'express';
import {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    changeEventStatus
} from './event.controller.js';

import {
    validateGetEventById,
    validateCreateEvent,
    validateUpdateEventRequest,
    validateEventStatusChange
} from '../../middlewares/event-validator.js';

import { validateJWT } from '../../middlewares/validate-jwt.js';

const router = Router();

router.get('/', validateJWT, getEvents);

router.get(
    '/:id',
    validateJWT,
    validateGetEventById,
    getEventById
);

router.post(
    '/',
    validateJWT,
    validateCreateEvent,
    createEvent
);

router.put(
    '/:id',
    validateJWT,
    validateUpdateEventRequest,
    updateEvent
);

router.patch(
    '/:id/status',
    validateJWT,
    validateEventStatusChange,
    changeEventStatus
);

export default router;
