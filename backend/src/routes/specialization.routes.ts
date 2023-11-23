import { Roles } from '~/constants/enum'
import { Router } from 'express'
import { checkPermission } from '~/middlewares/common.middlewares'
import { accessTokenValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
import {
  createSpecializationValidator,
  deleteSpecializationValidator,
  updateSpecializationValidator
} from '~/middlewares/specialization.middlewares'
import {
  createSpecializationController,
  deleteSpecialization,
  getCaterogiesController,
  updateSpecialization
} from '~/controllers/specialization.controlles'

const specializationRouters = Router()

/**
 * Description : Create a new specialization
 * Path: /
 * Method : Post
 * Headers : Bearer <access_token>
 * Permissions : Admin
 */
specializationRouters.post(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  createSpecializationValidator,
  wrapRequestHandler(createSpecializationController)
)

/**
 * Description : get all categories
 * Path: /
 * Method : GET
 * Headers : Bearer <access_token>
 * Permissions : Admin
 */
specializationRouters.post(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(getCaterogiesController)
)

/**
 * Description : Update a specialization
 * Path: /:id
 * Method : PUT
 * Headers : Bearer <access_token>
 * Permissions : Admin
 */
specializationRouters.put(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  updateSpecializationValidator,
  wrapRequestHandler(updateSpecialization)
)

/**
 * Description : Delete a specialization
 * Path: /:id
 * Method : DELETE
 * Headers : Bearer <access_token>
 * Permissions : Admin
 */
specializationRouters.delete(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  deleteSpecializationValidator,
  wrapRequestHandler(deleteSpecialization)
)

export default specializationRouters
