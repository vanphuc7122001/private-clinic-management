import { NextFunction, Request, Response } from 'express'
import { ROLE_MESSAGES } from '~/constants/message'

export const getRolesController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: ROLE_MESSAGES.GET_ROLES_SUCCESS
  })
}
