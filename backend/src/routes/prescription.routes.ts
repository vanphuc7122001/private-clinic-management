import { Router } from 'express'
import { Roles } from '~/constants/enum'
import {
  createPrescriptionController,
  getPrescriptionController,
  getPrescriptionsController,
  updatePrescriptionController
} from '~/controllers/prescription.controllers'

import { checkPermission, paginationValidator } from '~/middlewares/common.middlewares'
import {
  createPrescriptionValidator,
  getPrescriptionValidator,
  updatePrescriptionValidator
} from '~/middlewares/prescription.middlewares'
import { accessTokenValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const prescriptionRouters = Router()

/**
 * Description: create a prescription
 * Path: /
 * Method: POST
 * Headers : Bearer <access_token>
 * Body: CreateDoctorReqBody
 */
prescriptionRouters.post(
  '/medicines',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  createPrescriptionValidator,
  wrapRequestHandler(createPrescriptionController)
)

/**
 * Description: get a prescription
 * Path: /:id
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
prescriptionRouters.get(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  getPrescriptionValidator,
  wrapRequestHandler(getPrescriptionController)
)

/**
 * Description: get prescriptions
 * Path: /
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
prescriptionRouters.get(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  paginationValidator,
  wrapRequestHandler(getPrescriptionsController)
)

/**
 * Description: update prescription
 * Path: /:id
 * Method: PATCH
 * Headers: Bearer <access_token>
 * Body:
 */
prescriptionRouters.patch(
  '/:id/medicines',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  updatePrescriptionValidator,
  wrapRequestHandler(updatePrescriptionController)
)

export default prescriptionRouters
