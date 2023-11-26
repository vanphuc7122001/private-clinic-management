import { NextFunction, Request, Response } from 'express'
import { Roles } from './../constants/enum'
import { TokenPayload } from '~/models/requests/User.requests'
import { ErrorWithStatus } from '~/models/Errors'
import { USER_MESSAGES } from '~/constants/message'
import HTTP_STATUS from '~/constants/httpStatus'
import { validate } from '~/utils/validation'
import { ParamSchema, checkSchema } from 'express-validator'
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
  console.log(role)
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

export const paginationValidator = validate(
  checkSchema(
    {
      limit: {
        isNumeric: true,
        custom: {
          options: async (value, { req }) => {
            const num = Number(value)
            if (num > 100 || num < 1) {
              throw new Error('1 <= limit <= 100')
            }
            return true
          }
        }
      },
      page: {
        isNumeric: true,
        custom: {
          options: async (value, { req }) => {
            const num = Number(value)
            if (num < 1) {
              throw new Error('page >= 1')
            }
            return true
          }
        }
      }
    },
    ['query']
  )
)

export const stringEmptySchema = ({
  messageString,
  messageEmpty
}: {
  messageString: string
  messageEmpty: string
}): ParamSchema => {
  return {
    notEmpty: {
      errorMessage: messageEmpty
    },
    isString: {
      errorMessage: messageString
    },
    trim: true
  }
}
