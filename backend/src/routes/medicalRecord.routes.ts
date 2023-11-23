import { Router } from 'express'
import { Roles } from '~/constants/enum'
import {
  createMedicalRecordController,
  deleteMedicalRecordController,
  getMedicalRecordController,
  getMedicalRecordsController,
  updateMedicalRecordController
} from '~/controllers/medicalRecord.controllers'

import { checkPermission } from '~/middlewares/common.middlewares'
import { accessTokenValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const medicaRecordRouters = Router()

/**
 * Description: create a medical record
 * Path: /
 * Method: POST
 * Headers : Bearer <access_token>
 * Body: CreateDoctorReqBody
 */
medicaRecordRouters.post(
  '/',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
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
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(updateMedicalRecordController)
)

/**
 * Description: delete  medical record
 * Path: /:id
 * Method: DELETE
 * Headers: Bearer <access_token>
 * Body:
 */
medicaRecordRouters.delete(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.ADMIN]),
  wrapRequestHandler(deleteMedicalRecordController)
)

export default medicaRecordRouters
