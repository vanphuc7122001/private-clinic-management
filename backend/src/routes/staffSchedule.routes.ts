import { Router } from 'express'
import { Roles } from '~/constants/enum'
import {
  createStaffScheduleController,
  getStaffScheduleController,
  getStaffSchedulesController,
  updateStaffScheduleController
} from '~/controllers/staffSchedule.controllers'

import { checkPermission } from '~/middlewares/common.middlewares'
import { accessTokenValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const staffScheduleRouters = Router()

/**
 * Description: create a staff schedule
 * Path: /
 * Method: POST
 * Headers : Bearer <access_token>
 * Body: CreateDoctorReqBody
 */
staffScheduleRouters.post(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(createStaffScheduleController)
)

/**
 * Description: get a staff schedule
 * Path: /:id
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
staffScheduleRouters.get(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(getStaffScheduleController)
)

/**
 * Description: get staff schedule
 * Path: /
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
staffScheduleRouters.get(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(getStaffSchedulesController)
)

/**
 * Description: update staff schedule
 * Path: /:id
 * Method: PATCH
 * Headers: Bearer <access_token>
 * Body:
 */
staffScheduleRouters.patch(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(updateStaffScheduleController)
)

export default staffScheduleRouters
