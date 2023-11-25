import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  try {
    if (err instanceof ErrorWithStatus) {
      return res.status(err.status).json(omit(err, ['status']))
    }

    const finalError: any = {}
    Object.getOwnPropertyNames(err).forEach((key) => {
      if (
        !Object.getOwnPropertyDescriptor(err, key)?.configurable ||
        !Object.getOwnPropertyDescriptor(err, key)?.writable
      ) {
        return
      }
      finalError[key] = err[key]
    })
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: finalError.message,
      errors: omit(finalError, ['stack', 'message'])
    })
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
      errors: omit(error as any, ['stack', ',message'])
    })
  }
}
