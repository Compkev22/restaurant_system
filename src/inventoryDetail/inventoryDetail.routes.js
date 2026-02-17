'use strict'

import { Router } from 'express'
import { saveDetalleInventario, getDetallesByProduct, deleteDetalle } from './detalleInventario.controller.js'
import { saveDetalleInventarioValidator } from '../../middlewares/detalleInventario.validator.js'

const api = Router()

api.post('/', saveDetalleInventarioValidator, saveDetalleInventario)
api.get('/:id', getDetallesByProduct)

api.delete('/:id', deleteDetalle) 

export default api