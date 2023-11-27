import { stringEmptySchema, isLength } from './common.middlewares'
import { MEDICAL_RECORD_MESSAGES } from '~/constants/message'
import { ParamSchema, checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'
import databaseService from '~/services/database.service'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'

const servicesSchema: ParamSchema = {
  isArray: {
    errorMessage: MEDICAL_RECORD_MESSAGES.SERVICES_MUST_BE_ARRAY
  },
  notEmpty: {
    errorMessage: MEDICAL_RECORD_MESSAGES.SERVICESS_IS_REQUIRED
  },
  custom: {
    options: async (value) => {
      await Promise.all(
        value.map(async (id: string) => {
          const isService = await databaseService.medicalServices.findFirst({
            where: {
              id
            }
          })

          if (!isService) {
            throw new Error(MEDICAL_RECORD_MESSAGES.SERVICES_NOT_FOUND)
          }
        })
      )

      return true
    }
  }
}

const diagnosisSchema: ParamSchema = {
  ...stringEmptySchema({
    messageEmpty: MEDICAL_RECORD_MESSAGES.DIAGNOSIS_IS_REQUIRED,
    messageString: MEDICAL_RECORD_MESSAGES.DIAGNOS_MUST_BE_STRING
  }),
  isLength: isLength({ min: 1, max: 200, field: 'diagnosis', name: 'Medical record' })
}

const noteSchema: ParamSchema = {
  ...stringEmptySchema({
    messageEmpty: MEDICAL_RECORD_MESSAGES.NOTE_IS_REQUIRED,
    messageString: MEDICAL_RECORD_MESSAGES.NOTE_MUST_BE_STRING
  }),
  isLength: isLength({ min: 1, max: 200, field: 'note', name: 'Medical record' })
}

const appointmentIdSchema: ParamSchema = {
  ...stringEmptySchema({
    messageEmpty: MEDICAL_RECORD_MESSAGES.APPOINTMENT_IS_REQUIRED,
    messageString: MEDICAL_RECORD_MESSAGES.APPOINTMENT_MUST_BE_STRING
  }),
  isLength: isLength({ min: 1, max: 200, field: 'appointment id', name: 'Medical record' }),
  custom: {
    options: async (value) => {
      const [isAppointment, uniqueAppointment] = await Promise.all([
        databaseService.appointments.findFirst({
          where: {
            id: value
          }
        }),
        databaseService.medicalRecords.findFirst({
          where: {
            appointment_id: value
          }
        })
      ])

      if (!isAppointment) {
        throw new Error(MEDICAL_RECORD_MESSAGES.APPOINTMENT_NOT_FOUND)
      }

      if (uniqueAppointment) {
        throw new Error(MEDICAL_RECORD_MESSAGES.APPOINTMENT__ALREADY_EXIST_IN_MEDICAL_RECORD)
      }

      return true
    }
  }
}

const idSchema: ParamSchema = {
  notEmpty: {
    errorMessage: new ErrorWithStatus({
      message: MEDICAL_RECORD_MESSAGES.ID_IS_REQUIRED,
      status: HTTP_STATUS.BAD_REQUEST
    })
  },
  custom: {
    options: async (value) => {
      const isId = await databaseService.medicalRecords.findFirst({
        where: {
          id: value
        }
      })
      if (!isId) {
        throw new ErrorWithStatus({
          message: MEDICAL_RECORD_MESSAGES.MEDICAL_RECORD_NOT_FOUND,
          status: HTTP_STATUS.NOT_FOUND
        })
      }

      return true
    }
  }
}

export const createMedicalRecordValidator = validate(
  checkSchema(
    {
      services: servicesSchema,
      diagnosis: diagnosisSchema,
      note: noteSchema,
      appointment_id: appointmentIdSchema
    },
    ['body']
  )
)

export const updateMedicalRecordValidator = validate(
  checkSchema(
    {
      id: idSchema,
      services: servicesSchema,
      diagnosis: diagnosisSchema,
      note: noteSchema,
      appointment_id: { ...appointmentIdSchema, optional: true, notEmpty: undefined }
    },
    ['body', 'params']
  )
)

export const getMedicalRecordValidator = validate(
  checkSchema(
    {
      id: idSchema
    },
    ['params']
  )
)
