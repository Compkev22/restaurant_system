'use strict';

import { Router } from 'express';
import { getFullMenu } from './menu.controller.js';

const router = Router();

// Ruta principal para obtener todo el catálogo disponible
router.get('/', getFullMenu);

export default router;