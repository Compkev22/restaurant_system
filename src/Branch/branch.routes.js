'use strict';

import { Router } from 'express';
import { getBranches, createBranch, updateBranch, changeBranchStatus } from '../Branch/branch.controller.js';
import { validateCreateBranch, validateUpdateBranch } from '../../middlewares/branch.validator.js';

const router = Router();

router.get('/', getBranches);
router.post('/', validateCreateBranch, createBranch);
router.put('/:id', validateUpdateBranch, updateBranch);
router.patch('/:id/status', changeBranchStatus);
export default router;