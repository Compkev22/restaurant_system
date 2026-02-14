'use strict';

import { Router } from 'express';
import { getProducts, createProduct, updateProduct } from '../Product/product.controller.js';
import { validateCreateProduct, validateProductId } from '../../middlewares/product-validators.js';

const router = Router();

router.get('/', getProducts);
router.post('/', validateCreateProduct, createProduct);
router.put('/:id', validateProductId, updateProduct);

export default router;