import { Request, Response, NextFunction } from 'express'
import conn from '~/configs/database'

class UserController {
  //[GET /users]
  index(req: Request, res: Response, next: NextFunction) {
    conn.query('SELECT * from users', (_err, rows) => res.send(rows))
  }
}

export default new UserController()
