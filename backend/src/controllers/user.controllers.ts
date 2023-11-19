import { NextFunction, Request, Response } from 'express'
import { USER_MESSAGES } from '~/constants/message'
import { LoginReqBody, RegisterReqBody } from '~/models/requests/User.requests'
import userService from '~/services/user.service'

export const registerController = async (
  req: Request<any, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body
  const result = await userService.register(payload)
  return res.json({
    message: USER_MESSAGES.REGISTER_SUCCESS,
    result
  })
}

export const loginController = async (req: Request<any, any, LoginReqBody>, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  const result = await userService.login(email, password)

  return res.json({
    message: USER_MESSAGES.LOGIN_SUCCESS,
    result
  })
}
