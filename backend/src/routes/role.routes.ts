import { Router } from 'express'
import { getRolesController } from '~/controllers/role.controlllers'

const roleRouters = Router()

/**
 * Description : get roles
 * Path: /
 * Method: GET
 */

roleRouters.get('/', getRolesController)

export default roleRouters
