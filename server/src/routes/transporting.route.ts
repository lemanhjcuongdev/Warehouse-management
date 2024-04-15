import express from 'express'
import transportReceiptController from '~/controllers/transportReceipt.controller'

import { checkJwt } from '~/middleware/authentication'

const transportingRouter = express.Router()

//TRANSPORT ORDER
transportingRouter.post('/', [checkJwt], transportReceiptController.createTransportReceipt)
transportingRouter.get('/id/:id', [checkJwt], transportReceiptController.getTransportReceiptById)
transportingRouter.get('/status/:status', [checkJwt], transportReceiptController.getAllTransportReceiptsByStatus)
transportingRouter.patch('/:id', [checkJwt], transportReceiptController.editTransportReceiptById)
transportingRouter.delete('/:id', [checkJwt], transportReceiptController.softDeleteTransportReceiptById)

export default transportingRouter
