import { Express } from 'express'

import api from './api'

function route(app: Express) {
  app.use('/api', api)
}

export default route
