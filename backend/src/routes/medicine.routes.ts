import { getMedicinesController } from './../controllers/medicine.controllers'
import { Router } from 'express'
import mediaRouters from './media.routes'
import { accessTokenValidator } from '~/middlewares/user.middlewares'
import { checkPermission, paginationValidator } from '~/middlewares/common.middlewares'
import { Roles } from '~/constants/enum'
import { wrapRequestHandler } from '~/utils/handlers'
import {
  createMedicineController,
  deleteMedicineController,
  updateMedicineController
} from '~/controllers/medicine.controllers'
import {
  createMedicineValidator,
  deleteMedicineValidator,
  updateMedicineValidator
} from '~/middlewares/medicine.middlewares'

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
  createMedicineValidator,
  wrapRequestHandler(createMedicineController)
)

/**
 * Description: update  medicine
 * Path: /:id
 * Method: PATCH
 * Headers : Bearer <access_token>
 * Body: UpdateMedicineReqBody
 */

medicineRouters.put(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.PHARMACIST]),
  updateMedicineValidator,
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
  paginationValidator,
  wrapRequestHandler(getMedicinesController)
)

/**
 * Description: delete  medicines
 * Path: /:id
 * Method: DELETE
 * Headers : Bearer <access_token>
 *
 */

medicineRouters.delete(
  '/:id',
  accessTokenValidator,
  checkPermission([Roles.PHARMACIST]),
  deleteMedicineValidator,
  wrapRequestHandler(deleteMedicineController)
)

export default medicineRouters
