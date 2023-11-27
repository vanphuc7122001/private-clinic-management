import { isLength, stringEmptySchema } from './common.middlewares'
import { validate } from '~/utils/validation'
import { ParamSchema, checkSchema } from 'express-validator'
import { PRESCRIPTION_MESSAGES } from '~/constants/message'
import databaseService from '~/services/database.service'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'

const medicalRecordSchema: ParamSchema = {
  ...stringEmptySchema({
    messageEmpty: PRESCRIPTION_MESSAGES.MEDICAL_RECORD_IS_REQUIRED,
    messageString: PRESCRIPTION_MESSAGES.MEDICAL_RECORD_MUST_BE_STRING
  }),
  isLength: isLength({ min: 1, max: 200, field: 'medical record', name: 'Prescription' }),
  custom: {
    options: async (value) => {
      const [isMedicalRecord, uniqueMedicalRecord] = await Promise.all([
        databaseService.medicalRecords.findFirst({
          where: {
            id: value
          }
        }),
        databaseService.prescriptions.findUnique({
          where: {
            medical_record_id: value
          }
        })
      ])

      if (!isMedicalRecord) {
        throw new Error(PRESCRIPTION_MESSAGES.MEDICAL_RECORD_NOT_FOUND)
      }

      if (uniqueMedicalRecord) {
        throw new Error(PRESCRIPTION_MESSAGES.MEDICAL_ALREADY_EXIST)
      }

      return true
    }
  }
}

const medicineSchema: ParamSchema = {
  isArray: {
    errorMessage: PRESCRIPTION_MESSAGES.MEDICINE_MUST_BE_ARRAY
  },
  notEmpty: {
    errorMessage: PRESCRIPTION_MESSAGES.MEDICINE_IS_REQUIRED
  },
  custom: {
    options: async (value) => {
      await Promise.all([
        value.map(async (medicine: any) => {
          const isMedicines = await databaseService.medicines.findFirst({
            where: {
              id: medicine.id
            }
          })

          if (!isMedicines) {
            throw new Error(PRESCRIPTION_MESSAGES.MEDICINE_NOT_FOUND)
          }
        })
      ])

      return true
    }
  }
}
const idSchema: ParamSchema = {
  notEmpty: {
    errorMessage: new ErrorWithStatus({
      message: PRESCRIPTION_MESSAGES.ID_IS_REQUIRED,
      status: HTTP_STATUS.BAD_REQUEST
    })
  },
  custom: {
    options: async (value) => {
      const isId = await databaseService.prescriptions.findFirst({
        where: {
          id: value
        }
      })
      if (!isId) {
        throw new ErrorWithStatus({
          message: PRESCRIPTION_MESSAGES.PRESCRIPTION_NOT_FOUND,
          status: HTTP_STATUS.NOT_FOUND
        })
      }

      return true
    }
  }
}

export const createPrescriptionValidator = validate(
  checkSchema(
    {
      medical_record_id: medicalRecordSchema,
      medicines: medicineSchema
    },
    ['body']
  )
)

export const updatePrescriptionValidator = validate(
  checkSchema(
    {
      id: idSchema,
      medicines: medicineSchema
    },
    ['body', 'params']
  )
)

export const getPrescriptionValidator = validate(
  checkSchema(
    {
      id: idSchema,
      medical_record_id: medicalRecordSchema
    },
    ['body', 'params']
  )
)
