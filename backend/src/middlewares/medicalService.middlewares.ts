import { isLength } from './common.middlewares'
import { ParamSchema, checkSchema } from 'express-validator'
import HTTP_STATUS from '~/constants/httpStatus'
import { MEDICAL_SERVICE_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/Errors'
import databaseService from '~/services/database.service'
import { validate } from '~/utils/validation'

const nameSchema: ParamSchema = {
  isString: {
    errorMessage: MEDICAL_SERVICE_MESSAGES.NAME_MUST_BE_A_STRING
  },
  trim: true,
  notEmpty: {
    errorMessage: MEDICAL_SERVICE_MESSAGES.NAME_IS_REQUIRED
  },
  custom: {
    options: async (value) => {
      const isCaterogy = await databaseService.caterogies.findFirst({
        where: {
          name: value
        }
      })

      if (isCaterogy) {
        throw new Error(MEDICAL_SERVICE_MESSAGES.NAME_ALREADy_EXISTS)
      }

      return true
    }
  },
  isLength: isLength({ min: 1, max: 60, name: 'Caterogy', field: 'name' })
}

const idSchema: ParamSchema = {
  notEmpty: {
    errorMessage: new ErrorWithStatus({
      message: MEDICAL_SERVICE_MESSAGES.ID_IS_REQUIRED,
      status: HTTP_STATUS.BAD_REQUEST
    })
  },
  custom: {
    options: async (value) => {
      const isId = await databaseService.medicalServices.findFirst({
        where: {
          id: value
        }
      })
      if (!isId) {
        throw new ErrorWithStatus({
          message: MEDICAL_SERVICE_MESSAGES.SERVICE_NOT_FOUND,
          status: HTTP_STATUS.NOT_FOUND
        })
      }

      return true
    }
  }
}

const priceSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MEDICAL_SERVICE_MESSAGES.PRICE_IS_REQUIRED
  },
  isString: {
    errorMessage: MEDICAL_SERVICE_MESSAGES.PRICE_MUST_BE_STRING
  },
  trim: true
}

export const createMedicalServiceValidator = validate(
  checkSchema(
    {
      name: nameSchema,
      price: priceSchema
    },
    ['body']
  )
)

export const updateMedicalServiceValidator = validate(
  checkSchema(
    {
      name: nameSchema,
      price: priceSchema,
      id: idSchema
    },
    ['body', 'params']
  )
)

export const deleteMedicalServiceValidator = validate(
  checkSchema(
    {
      id: idSchema
    },
    ['params']
  )
)
