import { Router } from 'express'
import { Roles } from '~/constants/enum'
import {
  createMedicalServiceController,
  deleteMedicalServiceController,
  getMedicalServiceController,
  updateMedicalServiceController
} from '~/controllers/medicalService.controllers'
import { checkPermission, paginationValidator } from '~/middlewares/common.middlewares'
import {
  createMedicalServiceValidator,
  deleteMedicalServiceValidator,
  updateMedicalServiceValidator
} from '~/middlewares/medicalService.middlewares'
import { accessTokenValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const medicalServiceRouters = Router()

/**
 * Description: create medical service
 * Path: /
 * method: POST
 * Headers: Authorization Bearer <access_token>
 * Body: {name: string , price : string}
 */
medicalServiceRouters.post(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  createMedicalServiceValidator,
  wrapRequestHandler(createMedicalServiceController)
)

/**
 * Description: get medical service
 * Path: /
 * method: GET
 * Headers: Authorization Bearer <access_token>
 */
medicalServiceRouters.get(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  paginationValidator,
  wrapRequestHandler(getMedicalServiceController)
)

/**
 * Description: update
 * Path: /:id
 * method: PUT
 * Headers: Authorization Bearer <access_token>
 * Body: {name: string, price: string}
 */
medicalServiceRouters.put(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  updateMedicalServiceValidator,
  wrapRequestHandler(updateMedicalServiceController)
)

/**
 * Description: detele
 * Path: /:id
 * method: PUT
 * Headers: Authorization Bearer <access_token>
 * Params : {id: string}
 */
medicalServiceRouters.delete(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  deleteMedicalServiceValidator,
  wrapRequestHandler(deleteMedicalServiceController)
)

export default medicalServiceRouters
