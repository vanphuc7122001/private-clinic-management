import { NextFunction, Request, Response } from 'express'
import { USER_MESSAGES } from '~/constants/message'
import { LoginReqBody, RefreshTokenReqBody, RegisterReqBody, TokenPayload } from '~/models/requests/User.requests'
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

export const refreshTokenController = async (
  req: Request<any, any, RefreshTokenReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { refresh_token } = req.body
  const { exp, iat, is_patient, role, user_id, id: refresh_token_id } = req.decoded_refresh_token as TokenPayload
  const result = await userService.refreshToken({
    refresh_token_id,
    user_id,
    role,
    is_patient,
    exp,
    iat,
    refresh_token
  })
  return res.json({
    message: USER_MESSAGES.REFRESH_TOKEN_SUCCESS,
    result
  })
}
