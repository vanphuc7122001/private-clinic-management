import { Router } from 'express'
import { registerController } from '~/controllers/user.controllers'
import { registerValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const userRouters = Router()

/**
 * Description: register a user
 * Path: /register
 * Method: POST
 * Body: RegisterReqBody
 */
userRouters.post('/register', registerValidator, wrapRequestHandler(registerController))
export default userRouters
