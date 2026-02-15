import { Router } from 'express';
import { login, register } from './auth.controller.js';

const router = Router();

// Ruta para registrarse
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

export default router;