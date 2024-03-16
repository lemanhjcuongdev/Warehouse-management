import { validate } from 'class-validator'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import { Repository } from 'typeorm'
import { appDataSource } from '~/constants/appDataSource'
import { Users } from '~/models/entities/Users'
import authController from './auth.controller'

dotenv.config()

//use datasource
const userRepository = appDataSource.getRepository(Users)

class UserController {
  //[GET /users]
  async getAllUser(req: Request, res: Response, next: NextFunction) {
    //get all users from DB
    const users = await userRepository.find({
      select: ['idUsers', 'username', 'name', 'email', 'disabled']
    })

    res.send(users)
  }

  //[GET /users/:id]
  async getUserById(req: Request, res: Response, next: NextFunction) {
    //get id from query string
    const id: number = +req.params.id

    //get user by id from DB
    try {
      const user = await userRepository.findOneOrFail({
        select: ['idUsers', 'name', 'gender', 'username', 'phone', 'email', 'startDate', 'disabled'],
        where: {
          idUsers: id
        }
      })
      res.send(user)
    } catch (error) {
      res.status(404).send('Không tìm thấy người dùng')
    }
  }

  //[POST /users/create-user]
  async createUser(req: Request, res: Response, next: NextFunction) {
    //get params from request body
    const { name, email, gender, phone, startDate, username, password } = req.body

    const user = new Users()
    user.name = name
    user.email = email
    user.gender = gender
    user.phone = phone
    user.startDate = startDate
    user.username = username
    user.password = password
    user.idCreated = 1

    //validate type of params
    const errors = await validate(user)
    if (errors.length > 0) {
      res.status(400).send(errors)
      return
    }

    //hash password
    user.hashPassword()

    //try to save, if fails, the username is already in use
    try {
      await userRepository.save(user)
    } catch (error) {
      res.status(400).send('Tên đăng nhập đã được sử dụng trước đó ' + error + user.password)
      return
    }

    res.status(201).send('Đã tạo người dùng mới')
  }

  //[PATCH /:id]
  async editUserById(req: Request, res: Response, next: NextFunction) {
    //get id from query string
    const id: number = +req.params.id
    //get params from body request
    const { name, email, gender, phone, startDate, username, disabled } = req.body

    //get user by id from DB
    let user: Users
    try {
      user = await userRepository.findOneOrFail({
        where: {
          idUsers: id
        }
      })
    } catch (error) {
      res.status(404).send('Không tìm thấy người dùng')
      return
    }

    //validate type
    user.name = name
    user.email = email
    user.gender = gender
    user.phone = phone
    user.startDate = startDate
    user.username = username
    user.disabled = disabled
    const errors = await validate(user)
    if (errors.length > 0) {
      res.status(400).send(errors)
      return
    }

    //try to update, if fails, the username is already in use
    try {
      await userRepository.update(
        {
          idUsers: id
        },
        {
          name,
          email,
          gender,
          phone,
          startDate,
          username,
          disabled
        }
      )
    } catch (error) {
      res.status(409).send('Tên đăng nhập đã được sử dụng')
      return
    }

    //if ok
    res.status(204).send('Cập nhật người dùng thành công')
  }

  async softDeleteUserById(req: Request, res: Response, next: NextFunction) {
    const id: number = +req.params.id

    try {
      userRepository.update(
        {
          idUsers: id
        },
        {
          disabled: 1
        }
      )
    } catch (error) {
      res.status(404).send('Không tìm thấy người dùng')
      return
    }

    //if ok
    res.status(204).send('Đã vô hiệu hoá người dùng')
  }
}

export default new UserController()
