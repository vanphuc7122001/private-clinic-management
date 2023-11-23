import { Router } from 'express'
import mediaRouters from './media.routes'
import { accessTokenValidator } from '~/middlewares/user.middlewares'
import { checkPermission } from '~/middlewares/common.middlewares'
import { Roles } from '~/constants/enum'
import { wrapRequestHandler } from '~/utils/handlers'
import {
  createMedicineController,
  deleteMedicineController,
  updateMedicineController
} from '~/controllers/medicine.controllers'

const medicineRouters = Router()

/**
 * Description: create a new medicine
 * Path: /
 * Method: POST
 * Headers : Bearer <access_token>
 * Body: CreateMedicineReqBody
 */

medicineRouters.post(
  '/',
  accessTokenValidator,
  checkPermission([Roles.PHARMACIST]),
  wrapRequestHandler(createMedicineController)
)

/**
 * Description: update  medicine
 * Path: /:id
 * Method: PATCH
 * Headers : Bearer <access_token>
 * Body: UpdateMedicineReqBody
 */

medicineRouters.patch(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.PHARMACIST]),
  wrapRequestHandler(updateMedicineController)
)

/**
 * Description: get  medicines
 * Path: /
 * Method: GET
 * Headers : Bearer <access_token>
 *
 */

medicineRouters.get(
  '/',
  accessTokenValidator,
  checkPermission([Roles.PHARMACIST]),
  wrapRequestHandler(updateMedicineController)
)

/**
 * Description: delete  medicines
 * Path: /:id
 * Method: DELETE
 * Headers : Bearer <access_token>
 *
 */

medicineRouters.get(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.PHARMACIST]),
  wrapRequestHandler(deleteMedicineController)
)

export default mediaRouters
