import mysql, { ConnectionOptions } from 'mysql2'
import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

const access: ConnectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

const conn = mysql.createConnection(access)

export default conn
