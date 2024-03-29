import express from 'express'
import providerController from '~/controllers/provider.controller'

import { checkJwt } from '~/middleware/authentication'

const providerRouter = express.Router()

providerRouter.post('/', providerController.createProvider)
providerRouter.get('/', providerController.getAllProviders)
providerRouter.get('/:id', providerController.getProviderById)
providerRouter.patch('/:id', providerController.editProviderById)
providerRouter.delete('/:id', providerController.softDeleteProviderById)

export default providerRouter
