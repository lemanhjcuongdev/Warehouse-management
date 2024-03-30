import express from 'express'
import importOrderController from '~/controllers/importOrder.controller'

import { checkJwt } from '~/middleware/authentication'

const importingRouter = express.Router()

importingRouter.post('/', [checkJwt], importOrderController.createImportOrder)
importingRouter.get('/id/:id', [checkJwt], importOrderController.getImportOrderById)
importingRouter.get('/status/:status', [checkJwt], importOrderController.getAllImportOrdersByStatus)
importingRouter.patch('/:id', [checkJwt], importOrderController.editImportOrderById)
importingRouter.delete('/:id', [checkJwt], importOrderController.softDeleteImportOrderById)

export default importingRouter
