'use strict';

import { Router } from 'express';
import {
    createReview,
    getMyReviews,
    getBranchReviews,
    updateReview,
    deleteReview
} from './review.controller.js';

import { validateJWT } from '../../middlewares/validate-jwt.js';
import { hasRole } from '../../middlewares/role-validator.js';

const router = Router();

// CLIENTES
// crear reseña
router.post('/', validateJWT, hasRole('CLIENT'), createReview);

// ver mis reseñas
router.get('/mine', validateJWT, hasRole('CLIENT'), getMyReviews);

// actualizar reseña
router.put('/:id', validateJWT, hasRole('CLIENT'), updateReview);

// eliminar reseña
router.delete('/:id', validateJWT, hasRole('CLIENT'), deleteReview);

// PERSONAL / ADMIN
// ver reseñas por sucursal
router.get(
    '/branch/:branchId',
    validateJWT,
    hasRole('EMPLOYEE', 'BRANCH_ADMIN', 'PLATFORM_ADMIN'),
    getBranchReviews
);

export default router;