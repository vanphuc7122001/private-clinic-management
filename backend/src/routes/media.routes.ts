import { Router } from 'express'
import { uploadSignleImageController } from '~/controllers/media.controllers'
import { accessTokenValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const mediaRouters = Router()

/**
 * Description : upload a image
 * Path: /uploads/image
 * Method: POST
 * Body : fileName
 */
mediaRouters.post('/uploads/image', accessTokenValidator, wrapRequestHandler(uploadSignleImageController))

export default mediaRouters
