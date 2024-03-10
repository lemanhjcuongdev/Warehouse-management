import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import route from './routes'

const app = express()
const port = process.env.PORT
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('combined'))
app.use(cors())

//Routes init
route(app)

app.listen(port, () => {
  console.log(`Warehouse management web server is listening on port ${port}`)
})
