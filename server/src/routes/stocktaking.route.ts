import express from 'express'
import exportOrderController from '~/controllers/exportOrder.controller'
import stockTakingReceiptController from '~/controllers/stockTakingReceipt.controller'

import { checkJwt, checkRole } from '~/middleware/authentication'

const stocktakingRouter = express.Router()

//EXPORT RECEIPT
stocktakingRouter.post('/', [checkJwt, checkRole], stockTakingReceiptController.createStocktakingReceipt)
stocktakingRouter.get('/:id', [checkJwt, checkRole], stockTakingReceiptController.getStocktakingReceiptById)
stocktakingRouter.get('/', [checkJwt, checkRole], stockTakingReceiptController.getAllStocktakingReceipts)
stocktakingRouter.patch('/:id', [checkJwt, checkRole], stockTakingReceiptController.editStocktakingReceiptById)

export default stocktakingRouter
