import { Router } from 'express';
import { saveTable, getTables, updateTable, deleteTable } from './table.controller.js';
import { tableValidator } from './table.validator.js';

const api = Router();

api.post('/save', tableValidator, saveTable);
api.get('/', getTables);
api.put('/:id', tableValidator, updateTable);
api.delete('/:id', deleteTable);

export default api;