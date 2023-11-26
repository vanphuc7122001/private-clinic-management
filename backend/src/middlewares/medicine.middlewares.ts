import HTTP_STATUS from '~/constants/httpStatus'
import { isLength, stringEmptySchema } from './common.middlewares'
import { ParamSchema, checkSchema } from 'express-validator'
import { MEDICINE_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/Errors'
import { validate } from '~/utils/validation'
import databaseService from '~/services/database.service'

const nameSchema: ParamSchema = {
  ...stringEmptySchema({
    messageString: MEDICINE_MESSAGES.NAME_IS_REQUIRED,
    messageEmpty: MEDICINE_MESSAGES.NAME_IS_REQUIRED
  }),
  isLength: isLength({ min: 1, max: 100, field: 'name', name: 'Medicine' })
}

const manufacturerSchema: ParamSchema = {
  ...stringEmptySchema({
    messageString: MEDICINE_MESSAGES.MANUFACTURER_MUST_BE_STRING,
    messageEmpty: MEDICINE_MESSAGES.MANUFACTURER_IS_REQUIRED
  }),
  isLength: isLength({ min: 1, max: 100, field: 'manufaturer', name: 'Medicine' })
}

const usageSchema: ParamSchema = {
  ...stringEmptySchema({
    messageString: MEDICINE_MESSAGES.USAGE_MUST_BE_STRING,
    messageEmpty: MEDICINE_MESSAGES.USAGE_IS_REQUIRED
  }),
  isLength: isLength({ min: 1, max: 300, field: 'usage', name: 'Medicine' })
}

const quantitySchema: ParamSchema = {
  ...stringEmptySchema({
    messageString: MEDICINE_MESSAGES.QUANTITY_MUST_BE_A_STRING,
    messageEmpty: MEDICINE_MESSAGES.QUANTITY_IS_REQUIRED
  }),
  isLength: isLength({ min: 1, max: 20, field: 'quantity', name: 'Medicine' })
}

const priceSchema: ParamSchema = {
  ...stringEmptySchema({
    messageString: MEDICINE_MESSAGES.PRICE_MUST_BE_A_STRING,
    messageEmpty: MEDICINE_MESSAGES.PRICE_IS_REQUIRED
  }),
  isLength: isLength({ min: 1, max: 30, field: 'price', name: 'Medicine' })
}

const purcharsePriceSchema: ParamSchema = {
  ...stringEmptySchema({
    messageString: MEDICINE_MESSAGES.PURCHASE_PRICE_MUST_BE_A_STRING,
    messageEmpty: MEDICINE_MESSAGES.PURCHASE_PRICE_IS_REQUIRED
  }),
  isLength: isLength({ min: 1, max: 30, field: 'purchase_price', name: 'Medicine' })
}

const idSchema: ParamSchema = {
  notEmpty: {
    errorMessage: new ErrorWithStatus({
      message: MEDICINE_MESSAGES.ID_IS_REQUIRED,
      status: HTTP_STATUS.BAD_REQUEST
    })
  },
  custom: {
    options: async (value) => {
      const isId = await databaseService.medicines.findFirst({
        where: {
          id: value
        }
      })
      if (!isId) {
        throw new ErrorWithStatus({
          message: MEDICINE_MESSAGES.MEDICINE_NOT_FOUND,
          status: HTTP_STATUS.NOT_FOUND
        })
      }

      return true
    }
  }
}

export const createMedicineValidator = validate(
  checkSchema(
    {
      name: nameSchema,
      manufacturer: manufacturerSchema,
      usage: usageSchema,
      quantity: quantitySchema,
      price: priceSchema,
      purchase_price: purcharsePriceSchema
    },
    ['body']
  )
)

export const updateMedicineValidator = validate(
  checkSchema(
    {
      id: idSchema,
      name: nameSchema,
      manufacturer: manufacturerSchema,
      usage: usageSchema,
      quantity: quantitySchema,
      price: priceSchema,
      purchase_price: purcharsePriceSchema
    },
    ['body', 'params']
  )
)

export const deleteMedicineValidator = validate(
  checkSchema(
    {
      id: idSchema
    },
    ['params']
  )
)
