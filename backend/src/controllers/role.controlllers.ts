import { NextFunction, Request, Response } from 'express'
import { ROLE_MESSAGES } from '~/constants/message'
import roleService from '~/services/role.service'

export const getRolesController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await roleService.getRoles()
  res.json({
    message: ROLE_MESSAGES.GET_ROLES_SUCCESS,
    result
  })
}
