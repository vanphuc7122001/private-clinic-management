import { Router } from 'express'
import { Roles } from '~/constants/enum'
import {
  createPrescriptionDetailController,
  deletePrescriptionDetailController,
  getPrescriptionDetailController,
  getPrescriptionDetailsController,
  updatePrescriptionDetailController
} from '~/controllers/prescriptionDetail.controllers'

import { checkPermission } from '~/middlewares/common.middlewares'
import { accessTokenValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const prescriptionDetailRouters = Router()

/**
 * Description: create a prescription
 * Path: /
 * Method: POST
 * Headers : Bearer <access_token>
 * Body: CreateDoctorReqBody
 */
prescriptionDetailRouters.post(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(createPrescriptionDetailController)
)

/**
 * Description: get a prescription
 * Path: /:id
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
prescriptionDetailRouters.get(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(getPrescriptionDetailController)
)

/**
 * Description: get prescriptions
 * Path: /
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
prescriptionDetailRouters.get(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(getPrescriptionDetailsController)
)

/**
 * Description: update prescription
 * Path: /:id
 * Method: PATCH
 * Headers: Bearer <access_token>
 * Body:
 */
prescriptionDetailRouters.patch(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(updatePrescriptionDetailController)
)

/**
 * Description: delete prescription
 * Path: /:id
 * Method: DELETE
 * Headers: Bearer <access_token>
 * Body:
 */
prescriptionDetailRouters.delete(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(deletePrescriptionDetailController)
)

export default prescriptionDetailRouters
