'use strict';

import { Router } from 'express';
import { getEmployees, createEmploye, updateEmploye } from '../Employee/employee.controller.js';
import { validateCreateEmploye, validateEmployeId } from '../../middlewares/employee.validator.js';

const router = Router();

router.get('/', getEmployees);
router.post('/', validateCreateEmploye, createEmploye);
router.put('/:id', validateEmployeId, updateEmploye);

export default router;