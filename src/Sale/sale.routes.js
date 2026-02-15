import { Router } from 'express';
import { saveSale, getSales } from './sale.controller.js';
import { saleValidator } from './sale.validator.js';

const api = Router();

api.post('/save', saleValidator, saveSale);
api.get('/', getSales);

export default api;