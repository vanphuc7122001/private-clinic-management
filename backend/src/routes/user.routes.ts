import { Router } from 'express'
import { loginController, registerController } from '~/controllers/user.controllers'
import { loginValidator, registerValidator } from '~/middlewares/user.middlewares'
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
export default userRouters
