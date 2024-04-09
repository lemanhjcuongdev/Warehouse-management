import express from 'express'
import exportOrderController from '~/controllers/exportOrder.controller'
import exportReceiptController from '~/controllers/exportReceipt.controller'

import { checkJwt } from '~/middleware/authentication'

const exportingRouter = express.Router()

//EXPORT ORDER
exportingRouter.post('/orders/', [checkJwt], exportOrderController.createExportOrder)
exportingRouter.get('/orders/id/:id', [checkJwt], exportOrderController.getExportOrderById)
exportingRouter.get('/orders/', [checkJwt], exportOrderController.getAllExportOrders)
exportingRouter.delete('/orders/:id', [checkJwt], exportOrderController.softDeleteExportOrderById)

//EXPORT RECEIPT
exportingRouter.post('/receipts/', exportReceiptController.createExportReceipt)
exportingRouter.get('/receipts/id/:id', exportReceiptController.getExportReceiptById)
exportingRouter.get('/receipts/status/:status', exportReceiptController.getAllExportReceiptsByStatus)
exportingRouter.patch('/receipts/:id', exportReceiptController.editExportReceiptById)
exportingRouter.delete('/receipts/:id', exportReceiptController.softDeleteExportReceiptById)

export default exportingRouter
