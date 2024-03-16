import { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'

import { appDataSource } from '~/constants/appDataSource'
import { Users } from '~/models/entities/Users'
import * as jwt from 'jsonwebtoken'
import { validate } from 'class-validator'

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
      user = await userRepository.findOneOrFail({
        select: ['username', 'password', 'idUsers'],
        where: {
          username,
          disabled: 0
        }
      })
    } catch (error) {
      res.status(401).send('Tài khoản hoặc mật khẩu không đúng')
      return
    }

    // //Check if encrypted password match
    if (!user.verifyPassword(password)) {
      res.status(401).send('Tài khoản hoặc mật khẩu không đúng')
      return
    }

    const secretJwt = process.env.JWT_SECRET as string

    //Sign JWT, expired in 1h
    const token = jwt.sign({ userId: user.idUsers, username: user.username }, secretJwt, {
      expiresIn: '1h'
    })

    //if OK
    res.send({
      userId: user.idUsers,
      username,
      token
    })
  }

  //[PATCH /change-password]
  async changePassword(req: Request, res: Response, next: NextFunction) {
    //get id from jwt
    if (res.locals.jwtPayload?.userId === undefined) {
      res.status(400).send('Không tìm thấy ID người dùng')
      return
    }
    const id = res.locals.jwtPayload.userId

    //get params from body request
    const { oldPassword, newPassword } = req.body
    if (!(oldPassword && newPassword)) {
      res.status(400).send('Mật khẩu không trùng khớp')
    }

    //get user from DB
    const userRepository = appDataSource.getRepository(Users)
    let user: Users
    try {
      user = await userRepository.findOneOrFail({
        select: ['password'],
        where: {
          idUsers: id,
          disabled: 0
        }
      })
    } catch (error) {
      res.status(401).send()
      return
    }

    //check if old password matches
    if (!user.verifyPassword(oldPassword)) {
      res.status(401).send()
      return
    }

    //validate type
    user.password = newPassword
    const errors = await validate(user)
    if (errors.length > 0) {
      res.status(400).send(errors)
      return
    }

    //hash new password
    user.hashPassword()
    try {
      userRepository.update(
        {
          idUsers: id
        },
        {
          password: user.password
        }
      )
    } catch (error) {
      res.status(400).send('Đổi mật khẩu thất bại')
      return
    }

    res.status(204).send('Đổi mật khẩu thành công')
  }
}

export default new AuthController()