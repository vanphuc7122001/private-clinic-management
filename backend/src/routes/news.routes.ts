import { Router } from 'express'
import { Roles } from '~/constants/enum'
import {
  createNewsController,
  deleteNewsController,
  getAllNewsController,
  getNewsController,
  updateNewsController
} from '~/controllers/news.controllers'
import { checkPermission } from '~/middlewares/common.middlewares'
import { createNewsValidator } from '~/middlewares/news.middlewares'
import { accessTokenValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const newsRouters = Router()

/**
 * Description : create a news
 * Path: /
 * Method: POST
 * Headers : Bearer <access_token>
 * Body: CreateNewsReqBody
 */
newsRouters.post(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  createNewsValidator,
  wrapRequestHandler(createNewsController)
)

/**
 * Description : Get all news
 * Path: /
 * Method: GET
 * Headers : Bearer <access_token>
 *
 */
newsRouters.get('/', accessTokenValidator, checkPermission([Roles.ADMIN]), wrapRequestHandler(getAllNewsController))

/**
 * Description : Get news
 * Path: /:id
 * Method: POST
 * Headers : Bearer <access_token>
 * Params : {id: string}
 */
newsRouters.get('/:id', accessTokenValidator, checkPermission([Roles.ADMIN]), wrapRequestHandler(getNewsController))

/**
 * Description : Delete news
 * Path: /:id
 * Method: DELETE
 * Headers : Bearer <access_token>
 * Params : {id: string}
 */
newsRouters.delete(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(deleteNewsController)
)

/**
 * Description : Update news
 * Path: /:id
 * Method: PATCH
 * Headers : Bearer <access_token>
 * Params : {id: string}
 * Body : UpdateNewsReqBody
 */
newsRouters.patch(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(updateNewsController)
)

export default newsRouters
