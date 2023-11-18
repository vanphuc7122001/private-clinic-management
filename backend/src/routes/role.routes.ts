import { Router } from 'express'
import { getRolesController } from '~/controllers/role.controlllers'
import { wrapRequestHandler } from '~/utils/handlers'

const roleRouters = Router()

/**
 * Description : get roles
 * Path: /
 * Method: GET
 */

roleRouters.get('/', wrapRequestHandler(getRolesController))

export default roleRouters
