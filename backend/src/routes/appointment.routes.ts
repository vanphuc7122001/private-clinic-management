import { Router } from 'express'
import { Roles } from '~/constants/enum'
import {
  createAppointmentController,
  createAppointmentUserController,
  deleteAppointmentController,
  getAppointmentController,
  getAppointmentsAdminController,
  getAppointmentsController,
  updateAppointmentController
} from '~/controllers/appointment.controllers'
import {
  createAppointmentUserValidator,
  createAppointmentValidator,
  getOrDeleteAppointmentValidator,
  updateAppointmentValidator
} from '~/middlewares/appointment.middlewares'
import { checkPermission, paginationValidator } from '~/middlewares/common.middlewares'
import { accessTokenValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const appointmentRouters = Router()

/**
 * Description: create a appointment
 * Path: /
 * Method: POST
 * Headers : Bearer <access_token>
 * Body: CreateDoctorReqBody
 */
appointmentRouters.post(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  createAppointmentValidator,
  wrapRequestHandler(createAppointmentController)
)

/**
 * Description: create a appointment client
 * Path: /
 * Method: POST
 * Headers : Bearer <access_token>
 * Body: CreateDoctorReqBody
 */
appointmentRouters.post(
  '/users',
  accessTokenValidator,
  checkPermission([Roles.PATIENT]),
  createAppointmentUserValidator,
  wrapRequestHandler(createAppointmentUserController)
)

/**
 * Description: get a appointment
 * Path: /:id
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
appointmentRouters.get(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN, Roles.PATIENT, Roles.DOCTOR, Roles.SUPPORTER]),
  getOrDeleteAppointmentValidator,
  wrapRequestHandler(getAppointmentController)
)

/**
 * Description: get appointments with user_id
 * Path: /
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
appointmentRouters.get(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN, Roles.PATIENT]),
  paginationValidator,
  wrapRequestHandler(getAppointmentsController)
)

/**
 * Description: get appointments with admin , Roles.SUPPORTER
 * Path: /
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
appointmentRouters.get(
  '/admin',
  accessTokenValidator,
  checkPermission([Roles.ADMIN, Roles.SUPPORTER]),
  paginationValidator,
  wrapRequestHandler(getAppointmentsAdminController)
)

/**
 * Description: update appointment
 * Path: /:id
 * Method: PATCH
 * Headers: Bearer <access_token>
 * Body:
 */
appointmentRouters.patch(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  updateAppointmentValidator,
  wrapRequestHandler(updateAppointmentController)
)

/**
 * Description: delete appointment
 * Path: /:id
 * Method: Delete
 * Headers: Bearer <access_token>
 * Body:
 */
appointmentRouters.delete(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  getOrDeleteAppointmentValidator,
  wrapRequestHandler(deleteAppointmentController)
)

export default appointmentRouters
