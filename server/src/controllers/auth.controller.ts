import { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'

import { appDataSource } from '~/constants/appDataSource'
import { Users } from '~/models/entities/Users'
import * as jwt from 'jsonwebtoken'

dotenv.config()

class AuthController {
  //[POST /login]
  async login(req: Request, res: Response, next: NextFunction) {
    //Check empty
    const { username, password } = req.body
    if (!(username && password)) {
      res.status(400).send()
    }

    //Get user from DB
    const userRepository = appDataSource.getRepository(Users)
    let user: Users
    try {
      user = await userRepository.findOneByOrFail({ username })
    } catch (error) {
      res.status(401).send()
      return
    }

    //Check if encrypted password match
    if (!user.verifyPassword(password)) {
      res.status(401).send()
      return
    }

    const secretJwt = process.env.JWT_SECRET as string

    //Sign JWT, expired in 1h
    const token = jwt.sign({ userId: user.idUsers, username: user.username }, secretJwt, {
      expiresIn: '1h'
    })

    res.send(token)
  }

  //[POST]
}

export default new AuthController()
