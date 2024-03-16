import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

function checkJwt(req: Request, res: Response, next: NextFunction) {
  //get the jwt token from request head
  const token = req.headers['authorization'] || ''
  const secretJwt = process.env.JWT_SECRET as string

  let JwtPayload: string | jwt.JwtPayload

  try {
    //verify token
    JwtPayload = jwt.verify(token, secretJwt)
    res.locals.JwtPayload = JwtPayload
  } catch (error) {
    //if token is invalid, respond 401
    res.status(400).send()
    return
  }
  JwtPayload = {
    exp: Math.floor(Date.now() / 1000) + 3600 //expired in 1h
  }
  //send new token from every request
  const newToken = jwt.sign(JwtPayload, secretJwt)
  res.setHeader('token', newToken)

  //next middleware or controller
  next()
}

export { checkJwt }