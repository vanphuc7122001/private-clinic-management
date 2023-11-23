import { Router } from 'express'
import { Roles } from '~/constants/enum'
import {
  createDoctorController,
  deleteDoctorController,
  getDoctorController,
  getDoctorsController,
  updateDoctorController
} from '~/controllers/doctor.controllers'
import { checkPermission } from '~/middlewares/common.middlewares'
import { accessTokenValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const doctorRouters = Router()

/**
 * Description: create a doctor
 * Path: /
 * Method: POST
 * Headers : Bearer <access_token>
 * Body: CreateDoctorReqBody
 */
doctorRouters.post(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(createDoctorController)
)

/**
 * Description: get a doctor
 * Path: /:id
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
doctorRouters.get('/:id', accessTokenValidator, checkPermission([Roles.ADMIN]), wrapRequestHandler(getDoctorController))

/**
 * Description: get doctors
 * Path: /
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
doctorRouters.get('/', accessTokenValidator, checkPermission([Roles.ADMIN]), wrapRequestHandler(getDoctorsController))

/**
 * Description: update doctor information
 * Path: /:id
 * Method: PATCH
 * Headers: Bearer <access_token>
 * Body:
 */
doctorRouters.patch(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(updateDoctorController)
)

/**
 * Description: delete doctor
 * Path: /:id
 * Method: DELETE
 * Headers: Bearer <access_token>
 * Body:
 */
doctorRouters.patch(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(deleteDoctorController)
)

export default doctorRouters
