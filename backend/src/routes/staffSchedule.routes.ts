import { Router } from 'express'
import { Roles } from '~/constants/enum'
import {
  createStaffScheduleController,
  getStaffSchedulesController,
  getStaffSchedulesControllerOfUser,
  updateStaffScheduleController
} from '~/controllers/staffSchedule.controllers'

import { checkPermission, paginationValidator } from '~/middlewares/common.middlewares'
import { createStaffScheduleValidator, updateStaffScheduleValidator } from '~/middlewares/staffSchedule.middlewares'
import { accessTokenValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const staffScheduleRouters = Router()

/**
 * Description: create a staff schedule
 * Path: /
 * Method: POST
 * Headers : Bearer <access_token>
 * Body:
 */
staffScheduleRouters.post(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN, Roles.DOCTOR]),
  createStaffScheduleValidator,
  wrapRequestHandler(createStaffScheduleController)
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
  checkPermission([Roles.ADMIN, Roles.DOCTOR]),
  paginationValidator,
  wrapRequestHandler(getStaffSchedulesController)
)

/**
 * Description: get staff schedule
 * Path: /
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
staffScheduleRouters.get(
  '/user',
  accessTokenValidator,
  checkPermission([Roles.ADMIN, Roles.DOCTOR, Roles.PHARMACIST, Roles.SUPPORTER]),
  paginationValidator,
  wrapRequestHandler(getStaffSchedulesControllerOfUser)
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
  checkPermission([Roles.ADMIN, Roles.DOCTOR]),
  updateStaffScheduleValidator,
  wrapRequestHandler(updateStaffScheduleController)
)

export default staffScheduleRouters
