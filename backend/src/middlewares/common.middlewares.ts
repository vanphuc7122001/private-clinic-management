import { NextFunction, Request, Response } from 'express'
import { Roles } from './../constants/enum'
import { TokenPayload } from '~/models/requests/User.requests'
import { ErrorWithStatus } from '~/models/Errors'
import { USER_MESSAGES } from '~/constants/message'
import HTTP_STATUS from '~/constants/httpStatus'
export const isLength = ({ name, field, min, max }: { name: string; field: string; min: number; max: number }) => {
  return {
    options: {
      min,
      max
    },
    errorMessage: `The ${field} ${name} must have a length between ${min} and ${max}`
  }
}

// check role
export const checkPermission = (arrRole: Roles[]) => (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.decoded_authorization as TokenPayload
  const isPermission = arrRole.some((item) => item === role)
  if (!isPermission) {
    next(
      new ErrorWithStatus({
        message: USER_MESSAGES.NOT_PERMISSION,
        status: HTTP_STATUS.FORBIDDEN
      })
    )
  }
  return next()
}
