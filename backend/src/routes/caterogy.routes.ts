import { Router } from 'express'
import { Roles } from '~/constants/enum'
import {
  createCaterogyController,
  deleteCaterogy,
  getCaterogiesController,
  updateCaterogy
} from '~/controllers/caterogy.controlles'
import {
  createCaterogyValidator,
  deleteCaterogyValidator,
  updateCaterogyValidator
} from '~/middlewares/caterogy.middlewares'
import { checkPermission } from '~/middlewares/common.middlewares'
import { accessTokenValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const categoryRouters = Router()

/**
 * Description : Create a new category
 * Path: /
 * Method : Post
 * Headers : Bearer <access_token>
 * Permissions : Admin
 */

categoryRouters.post(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  createCaterogyValidator,
  wrapRequestHandler(createCaterogyController)
)

/**
 * Description : get all categories
 * Path: /
 * Method : GET
 * Headers : Bearer <access_token>
 * Permissions : Admin
 */

categoryRouters.post(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(getCaterogiesController)
)

/**
 * Description : Update a category
 * Path: /:id
 * Method : PUT
 * Headers : Bearer <access_token>
 * Permissions : Admin
 */

categoryRouters.put(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  updateCaterogyValidator,
  wrapRequestHandler(updateCaterogy)
)

/**
 * Description : Delete a category
 * Path: /:id
 * Method : DELETE
 * Headers : Bearer <access_token>
 * Permissions : Admin
 */

categoryRouters.delete(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  deleteCaterogyValidator,
  wrapRequestHandler(deleteCaterogy)
)

export default categoryRouters
