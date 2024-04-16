import express from 'express'
import exportOrderController from '~/controllers/exportOrder.controller'
import stockTakingReceiptController from '~/controllers/stockTakingReceipt.controller'

import { checkJwt } from '~/middleware/authentication'

const stocktakingRouter = express.Router()

//EXPORT RECEIPT
stocktakingRouter.post('/', [checkJwt], stockTakingReceiptController.createStocktakingReceipt)
stocktakingRouter.get('/:id', [checkJwt], stockTakingReceiptController.getStocktakingReceiptById)
stocktakingRouter.get('/', [checkJwt], stockTakingReceiptController.getAllStocktakingReceipts)
stocktakingRouter.patch('/:id', [checkJwt], stockTakingReceiptController.editStocktakingReceiptById)

export default stocktakingRouter
