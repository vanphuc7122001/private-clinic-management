import { Router } from 'express'
import { loginController, refreshTokenController, registerController } from '~/controllers/user.controllers'
import { loginValidator, refreshTokenValidator, registerValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const userRouters = Router()

/**
 * Description: register a user
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
 * Description: refresh token
 * Method : POST
 * Path : /refresh-token
 * Body :  {refresh_token : string}
 */
userRouters.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))

export default userRouters
