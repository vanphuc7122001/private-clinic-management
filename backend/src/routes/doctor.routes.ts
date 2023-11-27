import { Router } from 'express'
import { Roles } from '~/constants/enum'
import {
  createDoctorController,
  getDoctorController,
  getDoctorsController,
  updateDoctorController
} from '~/controllers/doctor.controllers'
import { checkPermission, paginationValidator } from '~/middlewares/common.middlewares'
import { createDoctorValidator, getDoctorValidator, updateDoctorValidator } from '~/middlewares/doctor.middlewares'
import { accessTokenValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const doctorRouters = Router()

/**
 * Description: create a doctor
 * Path: /
 * Method: POST
 * Headers : Bearer <access_token>
 * Body: DoctorReqBody
 */
doctorRouters.post(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  createDoctorValidator,
  wrapRequestHandler(createDoctorController)
)

/**
 * Description: get a doctor
 * Path: /:id
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
doctorRouters.get(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  getDoctorValidator,
  wrapRequestHandler(getDoctorController)
)

/**
 * Description: get doctors
 * Path: /
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
doctorRouters.get(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  paginationValidator,
  wrapRequestHandler(getDoctorsController)
)

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
  updateDoctorValidator,
  wrapRequestHandler(updateDoctorController)
)

export default doctorRouters
