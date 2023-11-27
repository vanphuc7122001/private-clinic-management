import { Router } from 'express'
import { Roles } from '~/constants/enum'
import {
  createMedicalRecordController,
  getMedicalRecordController,
  getMedicalRecordsController,
  updateMedicalRecordController
} from '~/controllers/medicalRecord.controllers'

import { checkPermission } from '~/middlewares/common.middlewares'
import {
  createMedicalRecordValidator,
  getMedicalRecordValidator,
  updateMedicalRecordValidator
} from '~/middlewares/medicalRecord.middlewares'
import { accessTokenValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const medicaRecordRouters = Router()

/**
 * Description: create a medical record with services
 * Path: /
 * Method: POST
 * Headers : Bearer <access_token>
 * Body: MedicalRecordReqBody & {services : ['id1', 'id2']}
 */
medicaRecordRouters.post(
  '/services',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  createMedicalRecordValidator,
  wrapRequestHandler(createMedicalRecordController)
)

/**
 * Description: get a  medical record
 * Path: /:id
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
medicaRecordRouters.get(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  getMedicalRecordValidator,
  wrapRequestHandler(getMedicalRecordController)
)

/**
 * Description: get  medical record
 * Path: /
 * Method: GET
 * Headers: Bearer <access_token>
 * Body:
 */
medicaRecordRouters.get(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(getMedicalRecordsController)
)

/**
 * Description: update  medical record
 * Path: /:id
 * Method: PATCH
 * Headers: Bearer <access_token>
 * Body:
 */
medicaRecordRouters.patch(
  '/:id/services',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  updateMedicalRecordValidator,
  wrapRequestHandler(updateMedicalRecordController)
)

export default medicaRecordRouters
