import express from 'express'

import userController from '~/controllers/user.controller'

const router = express.Router()

// userController.index
router.get('/', userController.index)

export default router
