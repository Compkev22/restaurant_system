'use strict';

import { Router } from 'express';
import { 
    createCoupon, 
    getCoupons, 
    updateCoupon, 
    deleteCoupon 
} from './coupon.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { hasRole } from '../../middlewares/role-validator.js';

const router = Router();

// Middleware global para todas las rutas de este archivo
router.use(validateJWT);
router.use(hasRole('PLATFORM_ADMIN'));

router.post('/', createCoupon);
router.get('/', getCoupons);
router.put('/:id', updateCoupon);
router.delete('/:id', deleteCoupon);

export default router;