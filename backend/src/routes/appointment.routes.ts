import { Router } from 'express'
import { Roles } from '~/constants/enum'
import {
  createAppointmentController,
  deleteAppointmentController,
  getAppointmentController,
  getAppointmentsController,
  updateAppointmentController
} from '~/controllers/appointment.controllers'
import {
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
 * Description: get a appointment
 * Path: /:id
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
appointmentRouters.get(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  getOrDeleteAppointmentValidator,
  wrapRequestHandler(getAppointmentController)
)

/**
 * Description: get appointments
 * Path: /
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
appointmentRouters.get(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  paginationValidator,
  wrapRequestHandler(getAppointmentsController)
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
