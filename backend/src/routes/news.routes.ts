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
import { createNewsValidator, getOrDeleteNewsValidator, updateNewsValidator } from '~/middlewares/news.middlewares'
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
newsRouters.get('/', wrapRequestHandler(getAllNewsController))

/**
 * Description : Get news
 * Path: /:id
 * Method: POST
 * Headers : Bearer <access_token>
 * Params : {id: string}
 */
newsRouters.get('/:id', getOrDeleteNewsValidator, wrapRequestHandler(getNewsController))

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
  getOrDeleteNewsValidator,
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
newsRouters.put(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  updateNewsValidator,
  wrapRequestHandler(updateNewsController)
)

export default newsRouters
