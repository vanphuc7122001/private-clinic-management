import { Router } from 'express'
import { Roles } from '~/constants/enum'
import {
  createPrescriptionController,
  deletePrescriptionController,
  getPrescriptionController,
  getPrescriptionsController,
  updatePrescriptionController
} from '~/controllers/prescription.controllers'

import { checkPermission } from '~/middlewares/common.middlewares'
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
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
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
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(updatePrescriptionController)
)

/**
 * Description: delete prescription
 * Path: /:id
 * Method: DELETE
 * Headers: Bearer <access_token>
 * Body:
 */
prescriptionRouters.delete(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(deletePrescriptionController)
)

export default prescriptionRouters
