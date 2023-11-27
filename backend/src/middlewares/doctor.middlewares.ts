import { Roles } from '~/constants/enum'
import { stringEmptySchema, isLength } from './common.middlewares'
import { ParamSchema, checkSchema } from 'express-validator'
import { DOCTOR_MESSAGES } from '~/constants/message'
import databaseService from '~/services/database.service'
import { validate } from '~/utils/validation'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'

const doctorIdSchema: ParamSchema = {
  ...stringEmptySchema({
    messageEmpty: DOCTOR_MESSAGES.DOCTOR_ID_IS_REQUIRED,
    messageString: DOCTOR_MESSAGES.DOCTOR_ID_MUST_BE_A_STRING
  }),
  isLength: isLength({
    min: 1,
    max: 200,
    field: 'doctor id',
    name: 'Doctor'
  }),
  custom: {
    options: async (value) => {
      const [isUser, isDoctorExist] = await Promise.all([
        await databaseService.users.findFirst({
          select: {
            roles: {
              select: {
                name: true
              }
            }
          },
          where: {
            id: value
          }
        }),
        databaseService.doctorProfiles.findFirst({
          where: {
            doctor_id: value
          }
        })
      ])

      if (!isUser || isUser.roles.name !== Roles.DOCTOR) {
        throw new Error(DOCTOR_MESSAGES.USER_NOT_FOUND_OR_USER_IS_NOT_DOCTOR)
      }

      if (isDoctorExist) {
        throw new Error(DOCTOR_MESSAGES.DOCTOR_ALREADY_EXIST)
      }

      return true
    }
  }
}

const certificationSchema: ParamSchema = {
  ...stringEmptySchema({
    messageEmpty: DOCTOR_MESSAGES.CERTIFICATION_IS_REQUIRED,
    messageString: DOCTOR_MESSAGES.CERTIFICATION_MUST_BE_A_STRING
  }),
  isLength: isLength({
    min: 1,
    max: 200,
    field: 'certification',
    name: 'Doctor'
  })
}

const expricenceSchema: ParamSchema = {
  ...stringEmptySchema({
    messageEmpty: DOCTOR_MESSAGES.EXPIRIENCE_IS_REQUIRED,
    messageString: DOCTOR_MESSAGES.EXPIRIENCE_MUST_BE_A_STRING
  }),
  isLength: isLength({
    min: 1,
    max: 200,
    field: 'expricence',
    name: 'Doctor'
  })
}

const educationSchema: ParamSchema = {
  ...stringEmptySchema({
    messageEmpty: DOCTOR_MESSAGES.EDUCATION_IS_REQUIRED,
    messageString: DOCTOR_MESSAGES.EDUCATION_MUST_BE_A_STRING
  }),
  isLength: isLength({
    min: 1,
    max: 200,
    field: 'education',
    name: 'Doctor'
  })
}

const idSchema: ParamSchema = {
  notEmpty: {
    errorMessage: new ErrorWithStatus({
      message: DOCTOR_MESSAGES.ID_IS_REQUIRED,
      status: HTTP_STATUS.BAD_REQUEST
    })
  },
  custom: {
    options: async (value) => {
      const isId = await databaseService.users.findFirst({
        where: {
          id: value
        }
      })
      if (!isId) {
        throw new ErrorWithStatus({
          message: DOCTOR_MESSAGES.DOCTOR_NOT_FOUND,
          status: HTTP_STATUS.NOT_FOUND
        })
      }

      return true
    }
  }
}

export const createDoctorValidator = validate(
  checkSchema(
    {
      doctor_id: doctorIdSchema,
      certification: certificationSchema,
      expricence: expricenceSchema,
      education: educationSchema
    },
    ['body']
  )
)

export const updateDoctorValidator = validate(
  checkSchema(
    {
      id: idSchema,
      certification: certificationSchema,
      expricence: expricenceSchema,
      education: educationSchema
    },
    ['body', 'params']
  )
)

export const getDoctorValidator = validate(
  checkSchema(
    {
      id: idSchema
    },
    ['params']
  )
)
