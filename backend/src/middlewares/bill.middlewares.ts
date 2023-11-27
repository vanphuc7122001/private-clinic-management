import { BillStatus } from '~/constants/enum'
import { isLength, stringEmptySchema } from './common.middlewares'
import { ParamSchema, checkSchema } from 'express-validator'
import { BILL_MESSAGES } from '~/constants/message'
import databaseService from '~/services/database.service'
import { stringEnumToArray } from '~/utils/commons'
import { validate } from '~/utils/validation'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'

const statusBill = stringEnumToArray(BillStatus)

const amountSchema: ParamSchema = {
  ...stringEmptySchema({
    messageEmpty: BILL_MESSAGES.AMOUNT_IS_REQUIRED,
    messageString: BILL_MESSAGES.AMOUNT_MUST_BE_STRING
  }),
  isLength: isLength({
    min: 1,
    max: 200,
    field: 'amount',
    name: 'Bill'
  })
}

const statusSchema: ParamSchema = {
  optional: true,
  isIn: {
    options: [statusBill],
    errorMessage: `Status bill must be one of the ${statusBill}`
  }
}

const idSchema: ParamSchema = {
  notEmpty: {
    errorMessage: new ErrorWithStatus({
      message: BILL_MESSAGES.ID_IS_REQUIRED,
      status: HTTP_STATUS.BAD_REQUEST
    })
  },
  custom: {
    options: async (value) => {
      const isId = await databaseService.bills.findFirst({
        where: {
          id: value
        }
      })
      if (!isId) {
        throw new ErrorWithStatus({
          message: BILL_MESSAGES.BILL_NOT_FOUND,
          status: HTTP_STATUS.NOT_FOUND
        })
      }

      return true
    }
  }
}

export const createBillValidator = validate(
  checkSchema(
    {
      medical_record_id: {
        ...stringEmptySchema({
          messageEmpty: BILL_MESSAGES.MEDICAL_RECORD_IS_REQUIRED,
          messageString: BILL_MESSAGES.MEDICAL_RECORD_MUST_BE_STRING
        }),
        isLength: isLength({
          min: 1,
          max: 200,
          field: 'Medical record id',
          name: 'Bill'
        }),
        custom: {
          options: async (value) => {
            const [isMedicalRecord, uniqueMedicalRecordIdInBill] = await Promise.all([
              databaseService.medicalRecords.findFirst({
                where: {
                  id: value
                }
              }),
              databaseService.bills.findFirst({
                where: {
                  medical_record_id: value
                }
              })
            ])

            if (!isMedicalRecord) {
              throw new Error(BILL_MESSAGES.MEDICAL_RECORD_NOT_FOUND)
            }

            if (uniqueMedicalRecordIdInBill) {
              throw new Error(BILL_MESSAGES.MEDICAL_RECORD_ALREADY_EXISTS)
            }

            return true
          }
        }
      },
      amount: amountSchema,
      status: statusSchema
    },
    ['body']
  )
)

export const updateBillValidator = validate(
  checkSchema(
    {
      id: idSchema,
      amount: amountSchema,
      status: statusSchema
    },
    ['body', 'params']
  )
)

export const getOrDeleteBillValidator = validate(
  checkSchema(
    {
      id: idSchema
    },
    ['params']
  )
)
