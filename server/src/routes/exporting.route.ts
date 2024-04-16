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
exportingRouter.post('/receipts/', [checkJwt], exportReceiptController.createExportReceipt)
exportingRouter.get('/receipts/id/:id', [checkJwt], exportReceiptController.getExportReceiptById)
exportingRouter.get('/receipts/status/:status', [checkJwt], exportReceiptController.getAllExportReceiptsByStatus)
exportingRouter.patch('/receipts/:id', [checkJwt], exportReceiptController.editExportReceiptById)
exportingRouter.delete('/receipts/:id', [checkJwt], exportReceiptController.softDeleteExportReceiptById)

export default exportingRouter
