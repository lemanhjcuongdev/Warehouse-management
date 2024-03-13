import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import 'reflect-metadata'
import dotenv from 'dotenv'

import helmet from 'helmet'
import { appDataSource } from './constants/appDataSource'
import route from './routes'

const app = express()
dotenv.config()
const port = process.env.APP_PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('combined'))
app.use(cors())
app.use(helmet())

//Routes init
route(app)

//Init Datasource
const main = async () => {
  console.time('main')
  await appDataSource.initialize()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

//listen port
app.listen(port, () => {
  console.log(`Warehouse management web server is listening on port ${port}`)
})
