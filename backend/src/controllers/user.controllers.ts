import { NextFunction, Request, Response } from 'express'
import { USER_MESSAGES } from '~/constants/message'
import {
  LogOutReqBody,
  LoginReqBody,
  RefreshTokenReqBody,
  RegisterReqBody,
  TokenPayload
} from '~/models/requests/User.requests'
import userService from '~/services/user.service'

export const registerController = async (
  req: Request<any, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body
  const { access_token, refresh_token } = await userService.register(payload)
  return res.json({
    message: USER_MESSAGES.REGISTER_SUCCESS,
    result: {
      access_token,
      refresh_token
    }
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

export const logoutController = async (req: Request<any, any, LogOutReqBody>, res: Response, next: NextFunction) => {
  const { refresh_token } = req.body
  const { id: refresh_token_id } = req.decoded_refresh_token as TokenPayload
  await userService.logout({ refresh_token, refresh_token_id })
  return res.json({
    message: USER_MESSAGES.LOGOUT_SUCCESS
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

export const getMeController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await userService.getMe(user_id)
  return res.json({
    message: USER_MESSAGES.GET_ME_SUCCESS,
    result
  })
}
