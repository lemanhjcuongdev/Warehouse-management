import { Express } from 'express'
import userRouter from './user.route'
import authRouter from './auth'
import warehouseRouter from './warehouse.route'
import goodsRouter from './goods.route'
import providerRouter from './provider.route'

function route(app: Express) {
  app.use('/users', userRouter)
  app.use('/auth', authRouter)
  app.use('/warehouses', warehouseRouter)
  app.use('/goods', goodsRouter)
  app.use('/providers', providerRouter)
}

export default route
