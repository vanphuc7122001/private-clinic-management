import { ParamSchema, checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'
import { dateSchema, stringEmptySchema } from './common.middlewares'
import { APPOINTMENT_MESSAGES } from '~/constants/message'
import databaseService from '~/services/database.service'
import { stringEnumToArray } from '~/utils/commons'
import { AppoitmentStatus } from '~/constants/enum'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'

const dateAppointmentSchema = dateSchema({
  messageDate: APPOINTMENT_MESSAGES.DATE_MUST_BE_TO_ISO_STRING,
  messageEmpty: APPOINTMENT_MESSAGES.DATE_IS_REQUIRED
})

const doctorIdSchema: ParamSchema = {
  ...stringEmptySchema({
    messageEmpty: APPOINTMENT_MESSAGES.DOCTOR_ID_IS_REQUIRED,
    messageString: APPOINTMENT_MESSAGES.DOCTOR_ID_IS_MUST_BE_A_STRING
  }),
  custom: {
    options: async (value, { req }) => {
      const isDoctor = await databaseService.doctorProfiles.findFirst({
        where: {
          doctor_id: value
        }
      })

      if (!isDoctor) {
        throw new Error(APPOINTMENT_MESSAGES.DOCTOR_NOT_FOUND)
      }

      return true
    }
  }
}

const patientIdSchema: ParamSchema = {
  ...stringEmptySchema({
    messageEmpty: APPOINTMENT_MESSAGES.PATIENT_ID_IS_REQUIRED,
    messageString: APPOINTMENT_MESSAGES.PATIENT_ID_IS_MUST_BE_A_STRING
  }),
  custom: {
    options: async (value, { req }) => {
      const isPatient = await databaseService.users.findFirst({
        where: {
          id: value
        }
      })

      if (!isPatient) {
        throw new Error(APPOINTMENT_MESSAGES.PATIENT_NOT_FOUND)
      }

      return true
    }
  }
}

const statusSchema: ParamSchema = {
  optional: true,
  isIn: {
    options: [stringEnumToArray(AppoitmentStatus)],
    errorMessage: `Status must be one of ${AppoitmentStatus}`
  }
}

const idSchema: ParamSchema = {
  notEmpty: {
    errorMessage: new ErrorWithStatus({
      message: APPOINTMENT_MESSAGES.ID_IS_REQUIRED,
      status: HTTP_STATUS.BAD_REQUEST
    })
  },
  custom: {
    options: async (value) => {
      const isId = await databaseService.appointments.findFirst({
        where: {
          id: value
        }
      })
      if (!isId) {
        throw new ErrorWithStatus({
          message: APPOINTMENT_MESSAGES.APPOINTMENT_NOT_FOUND,
          status: HTTP_STATUS.NOT_FOUND
        })
      }

      return true
    }
  }
}

export const createAppointmentValidator = validate(
  checkSchema(
    {
      date: dateAppointmentSchema,
      doctor_id: doctorIdSchema,
      patient_id: patientIdSchema,
      status: statusSchema
    },
    ['body']
  )
)

export const createAppointmentUserValidator = validate(
  checkSchema(
    {
      date: dateAppointmentSchema,
      doctor_id: doctorIdSchema,
      status: statusSchema
    },
    ['body']
  )
)

export const updateAppointmentValidator = validate(
  checkSchema(
    {
      id: idSchema,
      doctor_id: doctorIdSchema,
      patient_id: patientIdSchema,
      date: dateAppointmentSchema,
      status: statusSchema
    },
    ['body', 'params']
  )
)

export const getOrDeleteAppointmentValidator = validate(
  checkSchema(
    {
      id: idSchema
    },
    ['params']
  )
)
