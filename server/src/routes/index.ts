import { Express } from 'express'
import userRouter from './user.route'
import authRouter from './auth'
import warehouseRouter from './warehouse.route'
import goodsRouter from './goods.route'
import providerRouter from './provider.route'
import importingRouter from './importing.route'
import defectiveRecordRouter from './defectiveRecord.route'
import exportingRouter from './exporting.route'

function route(app: Express) {
  app.use('/users', userRouter)
  app.use('/auth', authRouter)
  app.use('/warehouses', warehouseRouter)
  app.use('/goods', goodsRouter)
  app.use('/providers', providerRouter)
  app.use('/import', importingRouter)
  app.use('/export', exportingRouter)
  app.use('/defective-records', defectiveRecordRouter)
}

export default route
