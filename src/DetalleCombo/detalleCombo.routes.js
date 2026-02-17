'use strict'

import { Router } from 'express'
import { addProductToCombo, getItemsByCombo } from './detalleCombo.controller.js'
import { saveDetalleComboValidator } from '../../middlewares/detalleCombo.validator.js'

const api = Router()

// Este es para crear (el que ya tenías)
api.post('/', saveDetalleComboValidator, addProductToCombo)

// ESTE ES EL QUE TE FALTA (para consultar por ID)
api.get('/:id', getItemsByCombo) 

export default api