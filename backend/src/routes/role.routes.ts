import { Router } from 'express'
import { createRoleController, getRolesController } from '~/controllers/role.controlllers'
import { createRoleValidator } from '~/middlewares/role.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const roleRouters = Router()

/**
 * Description : get roles
 * Path: /
 * Method: GET
 */

roleRouters.get('/', wrapRequestHandler(getRolesController))

/**
 * Description : create role
 * Path: /
 * Method: POST
 * Body : {name: string}
 */

roleRouters.post('/', createRoleValidator, wrapRequestHandler(createRoleController))

export default roleRouters
