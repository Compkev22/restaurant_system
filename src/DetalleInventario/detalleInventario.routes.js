'use strict'

import { Router } from 'express'
import { saveDetalleInventario, getDetallesByProduct, deleteDetalle } from './detalleInventario.controller.js'
// Importa tu validador si lo creaste
import { saveDetalleInventarioValidator } from '../../middlewares/detalleInventario.validator.js'

const api = Router()

api.post('/', saveDetalleInventarioValidator, saveDetalleInventario)
api.get('/:id', getDetallesByProduct)

// ESTA ES LA QUE TE FALTA:
api.delete('/:id', deleteDetalle) 

export default api