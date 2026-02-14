'use strict';

import { Router } from 'express';
import { getBranches, createBranch, updateBranch } from '../Branch/branch.controller.js';
import { validateCreateBranch, validateUpdateBranch } from '../../middlewares/branch.validator.js';

const router = Router();

router.get('/', getBranches);
router.post('/', validateCreateBranch, createBranch);
router.put('/:id', validateUpdateBranch, updateBranch);

export default router;