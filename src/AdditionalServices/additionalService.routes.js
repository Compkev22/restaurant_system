import { Router } from 'express';
import {
    getAdditionalServices,
    createAdditionalService,
    updateAdditionalService,
    changeAdditionalServiceStatus
} from './additionaService.controller.js';


const router = Router();

router.get('/', getAdditionalServices);

router.post(
    '/',
    createAdditionalService
);

router.put(
    '/:id',
    updateAdditionalService
);

router.patch(
    '/:id/status',
    changeAdditionalServiceStatus
);

export default router;