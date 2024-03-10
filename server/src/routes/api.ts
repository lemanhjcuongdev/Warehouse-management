import express from 'express'

import router from './user.route'

const userRouter = router

const api = express.Router()

// user
api.use('/user', userRouter)

export default api
