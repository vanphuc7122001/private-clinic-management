import { Router } from 'express'
import { Roles } from '~/constants/enum'
import {
  createBillController,
  deleteBillController,
  getBillController,
  getBillsController,
  updateBillController
} from '~/controllers/bill.controllers'
import { createBillValidator, updateBillValidator } from '~/middlewares/bill.middlewares'

import { checkPermission, paginationValidator } from '~/middlewares/common.middlewares'
import { accessTokenValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const billRouters = Router()

/**
 * Description: create a bill
 * Path: /
 * Method: POST
 * Headers : Bearer <access_token>
 * Body: CreateDoctorReqBody
 */
billRouters.post(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN, Roles.DOCTOR]),
  createBillValidator,
  wrapRequestHandler(createBillController)
)

/**
 * Description: get a bill
 * Path: /:id
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
billRouters.get(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN, Roles.DOCTOR, Roles.PATIENT]),
  wrapRequestHandler(getBillController)
)

/**
 * Description: get bills
 * Path: /
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
billRouters.get(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  paginationValidator,
  wrapRequestHandler(getBillsController)
)

/**
 * Description: update bill
 * Path: /:id
 * Method: PATCH
 * Headers: Bearer <access_token>
 * Body:
 */
billRouters.patch(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  updateBillValidator,
  wrapRequestHandler(updateBillController)
)

/**
 * Description: delete bill
 * Path: /:id
 * Method: DELETE
 * Headers: Bearer <access_token>
 * Body:
 */
billRouters.delete(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(deleteBillController)
)

export default billRouters
