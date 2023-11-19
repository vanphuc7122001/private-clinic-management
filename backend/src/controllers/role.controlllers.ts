import { NextFunction, Request, Response } from 'express'
import { ROLE_MESSAGES } from '~/constants/message'
import { createRoleReqBody } from '~/models/requests/Role.requests'
import roleService from '~/services/role.service'

export const getRolesController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await roleService.getRoles()
  res.json({
    message: ROLE_MESSAGES.GET_ROLES_SUCCESS,
    result
  })
}

export const createRoleController = async (
  req: Request<any, any, createRoleReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body
  const result = await roleService.createRole(name)
  res.json({
    message: ROLE_MESSAGES.CREATE_ROLES_SUCCESS,
    result
  })
}
