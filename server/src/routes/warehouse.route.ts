import express from 'express'
import warehouseController from '~/controllers/warehouse.controller'

import { checkJwt } from '~/middleware/authentication'

const warehouseRouter = express.Router()

warehouseRouter.post('/', [checkJwt], warehouseController.createWarehouse)
warehouseRouter.get('/', [checkJwt], warehouseController.getAllWarehouses)
warehouseRouter.get('/:id', [checkJwt], warehouseController.getWarehouseById)
warehouseRouter.get('/slots/:id', [checkJwt], warehouseController.getWarehouseSlots)
warehouseRouter.patch('/:id', [checkJwt], warehouseController.editWarehouseById)
warehouseRouter.delete('/:id', [checkJwt], warehouseController.softDeleteWarehouseById)

export default warehouseRouter
