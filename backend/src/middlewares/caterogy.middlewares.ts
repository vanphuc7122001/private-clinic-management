import { isLength } from './common.middlewares'
import { ParamSchema, checkSchema } from 'express-validator'
import HTTP_STATUS from '~/constants/httpStatus'
import { CATEROGY_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/Errors'
import databaseService from '~/services/database.service'
import { validate } from '~/utils/validation'

const nameSchema: ParamSchema = {
  notEmpty: {
    errorMessage: CATEROGY_MESSAGES.CATEROGY_IS_REQUIRED
  },
  isString: {
    errorMessage: CATEROGY_MESSAGES.CATEROGY_MUST_BE_STRING
  },
  trim: true,
  custom: {
    options: async (value) => {
      const isCaterogy = await databaseService.caterogies.findFirst({
        where: {
          name: value
        }
      })

      if (isCaterogy) {
        throw new Error(CATEROGY_MESSAGES.CATEROGY_ALREADY_EXISTS)
      }

      return true
    }
  },
  isLength: isLength({ min: 1, max: 60, name: 'Caterogy', field: 'name' })
}

const idSchema: ParamSchema = {
  notEmpty: {
    errorMessage: new ErrorWithStatus({
      message: CATEROGY_MESSAGES.ID_IS_REQUIRED,
      status: HTTP_STATUS.BAD_REQUEST
    })
  },
  custom: {
    options: async (value) => {
      const isId = await databaseService.caterogies.findFirst({
        where: {
          id: value
        }
      })
      if (!isId) {
        throw new ErrorWithStatus({
          message: CATEROGY_MESSAGES.CATEROGY_NOT_FOUND,
          status: HTTP_STATUS.NOT_FOUND
        })
      }

      return true
    }
  }
}

export const createCaterogyValidator = validate(
  checkSchema(
    {
      name: nameSchema
    },
    ['body']
  )
)

export const getCaterogyValidator = validate(
  checkSchema(
    {
      id: idSchema
    },
    ['params']
  )
)

export const updateCaterogyValidator = validate(
  checkSchema(
    {
      name: nameSchema,
      id: idSchema
    },
    ['body', 'params']
  )
)

export const deleteCaterogyValidator = validate(
  checkSchema(
    {
      id: idSchema
    },
    ['params']
  )
)
