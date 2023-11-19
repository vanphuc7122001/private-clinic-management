import { NextFunction, Request, Response } from 'express'
import { USER_MESSAGES } from '~/constants/message'
import { RegisterReqBody } from '~/models/requests/User.requests'
import userService from '~/services/user.service'

export const registerController = async (
  req: Request<any, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body
  const result = await userService.register(payload)
  return res.json({
    messages: USER_MESSAGES.REGISTER_SUCCESS
  })
}
