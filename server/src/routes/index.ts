import { Express } from 'express'
import userRouter from './user.route'
import authRouter from './auth'
import warehouseRouter from './warehouse.route'

function route(app: Express) {
  //User routes
  app.use('/users', userRouter)
  //login routes
  app.use('/auth', authRouter)
  app.use('/warehouses', warehouseRouter)
}

export default route
