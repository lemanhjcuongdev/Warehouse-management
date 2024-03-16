import express from 'express'

import userController from '~/controllers/user.controller'
import { checkJwt } from '~/middleware/authentication'

const userRouter = express.Router()

userRouter.get(
  '/',
  // [checkJwt],
  userController.getAllUser
)
userRouter.get('/:id', [checkJwt], userController.getUserById)
userRouter.post('/create-user', [checkJwt], userController.createUser)
userRouter.patch('/:id', [checkJwt], userController.editUserById)
userRouter.delete('/:id', [checkJwt], userController.softDeleteUserById)

export default userRouter
