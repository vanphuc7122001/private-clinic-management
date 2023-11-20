import { NextFunction, Request, Response } from 'express'
import { envConfig } from '~/constants/config'
import { USER_MESSAGES } from '~/constants/message'
import {
  ChangePassReqBody,
  ForgotPassReqBody,
  LogOutReqBody,
  LoginReqBody,
  RefreshTokenReqBody,
  RegisterReqBody,
  ResetPassReq,
  TokenPayload
} from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
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

export const changePasswordController = async (
  req: Request<any, any, ChangePassReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { new_password: password } = req.body
  await userService.changePassword(user_id, password)
  return res.json({
    message: USER_MESSAGES.CHANGE_PASSWORD_SUCCESS
  })
}

export const forgotPasswordController = async (
  req: Request<any, any, ForgotPassReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { id: user_id } = req.user as User
  await userService.forgotPassword({ user_id: user_id as string, email: req.body.email })
  return res.json({
    message: USER_MESSAGES.CHECK_EMAIL_TO_RESET_PASSWORD
  })
}

export const verifyForgotPasswordController = (
  req: Request<any, any, any, { forgot_password_token: string }>,
  res: Response,
  next: NextFunction
) => {
  const { forgot_password_token } = req.query
  return res.redirect(`${envConfig.clientUrl}/reset-password?token=${forgot_password_token}`)
}

export const resetPasswordController = async (
  req: Request<any, any, ResetPassReq>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_forgot_password_token as TokenPayload
  const { password } = req.body
  await userService.resetPassword(user_id, password)
  return res.json({
    message: USER_MESSAGES.RESET_PASSWORD_SUCCESS
  })
}
