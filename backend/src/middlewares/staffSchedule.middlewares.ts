import { ParamSchema, checkSchema, param } from 'express-validator'
import { validate } from '~/utils/validation'
import { dateSchema, isLength, stringEmptySchema } from './common.middlewares'
import { STAFF_SCHEDULE_MESSAGES } from '~/constants/message'
import databaseService from '~/services/database.service'
import { Roles } from '~/constants/enum'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'

const dateWorkSchema = dateSchema({
  messageDate: STAFF_SCHEDULE_MESSAGES.DATE_MUST_BE_ISO_STRING,
  messageEmpty: STAFF_SCHEDULE_MESSAGES.DATE_IS_REQUIRED
})

const staffSchema: ParamSchema = {
  ...stringEmptySchema({
    messageEmpty: STAFF_SCHEDULE_MESSAGES.STAFF_ID_IS_REQUIRED,
    messageString: STAFF_SCHEDULE_MESSAGES.STAFF_MUST_BE_A_STRING
  }),
  custom: {
    options: async (value, { req }) => {
      const isCheckStaff = await databaseService.users.findFirst({
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
      })

      if (!isCheckStaff || isCheckStaff.roles.name === Roles.PATIENT) {
        throw new Error(STAFF_SCHEDULE_MESSAGES.STAFF_NOT_FOUND)
      }

      return true
    }
  }
}

const shiftSchema: ParamSchema = {
  ...stringEmptySchema({
    messageEmpty: STAFF_SCHEDULE_MESSAGES.SHIFT_IS_REQUIRED,
    messageString: STAFF_SCHEDULE_MESSAGES.SHIFT_MUST_BE_STRING
  }),
  isLength: isLength({
    min: 1,
    max: 100,
    field: 'shift',
    name: 'Staff schedule'
  })
}

const idSchema: ParamSchema = {
  notEmpty: {
    errorMessage: new ErrorWithStatus({
      message: STAFF_SCHEDULE_MESSAGES.ID_IS_REQUIRED,
      status: HTTP_STATUS.BAD_REQUEST
    })
  },
  custom: {
    options: async (value) => {
      const isId = await databaseService.staffSchedules.findFirst({
        where: {
          id: value
        }
      })
      if (!isId) {
        throw new ErrorWithStatus({
          message: STAFF_SCHEDULE_MESSAGES.STAFF_SCHEDULE_NOT_FOUND,
          status: HTTP_STATUS.NOT_FOUND
        })
      }

      return true
    }
  }
}

export const createStaffScheduleValidator = validate(
  checkSchema(
    {
      date: dateWorkSchema,
      staff_id: staffSchema,
      shift: shiftSchema,
      note: {
        optional: true
      }
    },
    ['body']
  )
)

export const updateStaffScheduleValidator = validate(
  checkSchema(
    {
      id: idSchema,
      date: dateWorkSchema,
      staff_id: staffSchema,
      shift: shiftSchema,
      note: {
        optional: true
      }
    },
    ['body', 'params']
  )
)
