import { Router } from 'express'
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController
} from '~/controllers/user.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const userRouters = Router()

/**
 * Description: register a user || create patient , employee, doctor
 * Path: /register
 * Method: POST
 * Body: RegisterReqBody
 */
userRouters.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Description: Login system
 * Path: /login
 * Method: POST
 * Body: {email: string , password: string}
 */
userRouters.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Description: Logout system
 * Path: /logout
 * Method: POST
 * Headers Bearer <access_token>
 * Body : {refresh_token : string}
 */
userRouters.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

/**
 * Description: refresh token
 * Method : POST
 * Path : /refresh-token
 * Body :  {refresh_token : string}
 */
userRouters.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))

export default userRouters
