import express from 'express'
import providerController from '~/controllers/provider.controller'

import { checkJwt } from '~/middleware/authentication'

const providerRouter = express.Router()

providerRouter.post('/', [checkJwt], providerController.createProvider)
providerRouter.get('/', [checkJwt], providerController.getAllProviders)
providerRouter.get('/:id', [checkJwt], providerController.getProviderById)
providerRouter.patch('/:id', [checkJwt], providerController.editProviderById)
providerRouter.delete('/:id', [checkJwt], providerController.softDeleteProviderById)

export default providerRouter
