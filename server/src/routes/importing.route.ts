import express from 'express'
import importOrderController from '~/controllers/importOrder.controller'
import importReceiptController from '~/controllers/importReceipt.controller'

import { checkJwt } from '~/middleware/authentication'

const importingRouter = express.Router()

//IMPORT ORDER
importingRouter.post('/orders/', [checkJwt], importOrderController.createImportOrder)
importingRouter.get('/orders/id/:id', [checkJwt], importOrderController.getImportOrderById)
importingRouter.get('/orders/status/:status', [checkJwt], importOrderController.getAllImportOrdersByStatus)
importingRouter.patch('/orders/:id', [checkJwt], importOrderController.editImportOrderById)
importingRouter.delete('/orders/:id', [checkJwt], importOrderController.softDeleteImportOrderById)

//IMPORT RECEIPT
importingRouter.post('/receipts/', importReceiptController.createImportReceipt)
importingRouter.get('/receipts/id/:id', importReceiptController.getImportReceiptById)
importingRouter.get('/receipts/status/:status', importReceiptController.getAllImportReceiptsByStatus)
importingRouter.patch('/receipts/:id', importReceiptController.editImportReceiptById)
importingRouter.delete('/receipts/:id', importReceiptController.softDeleteImportReceiptById)

export default importingRouter
