import { Router } from 'express';
import { saveMenu, getMenu, updateMenu, deleteMenu } from './menu.controller.js';
import { menuValidator } from './menu.validator.js';

const api = Router();

api.post('/save', menuValidator, saveMenu);
api.get('/', getMenu);
api.put('/:id', menuValidator, updateMenu);
api.delete('/:id', deleteMenu);

export default api;