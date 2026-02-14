'use strict';

import { Router } from 'express';
import { getEmployees, createEmploye, updateEmploye } from '../Employe/employe.controller.js';
import { validateCreateEmploye, validateEmployeId } from '../../middlewares/employe-validators.js';

const router = Router();

router.get('/', getEmployees);
router.post('/', validateCreateEmploye, createEmploye);
router.put('/:id', validateEmployeId, updateEmploye);

export default router;