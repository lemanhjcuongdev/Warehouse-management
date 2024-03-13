import { Express } from 'express'
import userRouter from './user.route'
import authRouter from './auth'

function route(app: Express) {
  //User routes
  app.use('/users', userRouter)
  //login routes
  app.use('/auth', authRouter)
}

export default route
