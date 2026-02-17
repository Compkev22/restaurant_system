import { Router } from 'express';
import { 
    saveInventory, 
    getInventory, 
    updateInventory, 
    deleteInventory 
} from './inventory.controller.js';
import { inventoryValidator } from '../../middlewares/inventory-validator.js';
const api = Router();

api.post('/save', inventoryValidator, saveInventory);
api.get('/', getInventory);
// Vamos a usar el estándar: solo el ID para editar y eliminar
api.put('/:id', inventoryValidator, updateInventory); 
api.delete('/:id', deleteInventory);
export default api;