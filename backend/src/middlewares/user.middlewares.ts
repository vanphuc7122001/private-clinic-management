import { ParamSchema, checkSchema } from 'express-validator'
import { USER_MESSAGES } from '~/constants/message'
import { validate } from '~/utils/validation'
import { isLength } from './common.middlewares'
import { stringEnumToArray } from '~/utils/commons'
import { Genders } from '~/constants/enum'
import databaseService from '~/services/database.service'

const genderType = stringEnumToArray(Genders)

const passwordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USER_MESSAGES.PASSWORD_IS_REQUIRED
  },
  isString: {
    errorMessage: USER_MESSAGES.PASSWORD_MUST_BE_A_STRING
  },
  isLength: isLength({ min: 6, max: 50, field: 'name', name: 'User' }),
  isStrongPassword: {
    options: {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    errorMessage: USER_MESSAGES.PASSWORD_MUST_BE_STRONG
  }
}

export const registerValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: USER_MESSAGES.NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: USER_MESSAGES.NAME_MUST_BE_A_STRING
        },
        trim: true,
        isLength: isLength({ min: 1, max: 100, field: 'name', name: 'User' })
      },
      gender: {
        notEmpty: {
          errorMessage: USER_MESSAGES.GENDER_IS_REQUIRED
        },
        isIn: {
          options: [genderType],
          errorMessage: `Gender type must be one of ${genderType}`
        },
        trim: true
      },
      avatar: {
        optional: true,
        isString: {
          errorMessage: USER_MESSAGES.AVATAR_MUST_BE_STRING
        }
      },
      address: {
        notEmpty: {
          errorMessage: USER_MESSAGES.ADDRESS_IS_REQUIRED
        },
        isString: {
          errorMessage: USER_MESSAGES.ADDRESS_MUST_BE_STRING
        },
        isLength: isLength({ min: 1, max: 200, field: 'address', name: 'User' }),
        trim: true
      },
      phone: {
        notEmpty: {
          errorMessage: USER_MESSAGES.PHONE_IS_REQUIRED
        },
        isString: {
          errorMessage: USER_MESSAGES.PHONE_MUST_BE_STRING
        },
        isLength: isLength({ min: 10, max: 15, field: 'address', name: 'User' }),
        trim: true
      },
      email: {
        optional: true,
        isEmail: {
          errorMessage: USER_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true
      },
      password: {
        ...passwordSchema,
        optional: true,
        notEmpty: undefined
      },
      is_patient: {
        optional: true,
        isBoolean: {
          errorMessage: USER_MESSAGES.IS_PATIENT_MUST_BE_A_BOOLEAN
        }
      },
      role_id: {
        notEmpty: {
          errorMessage: USER_MESSAGES.ROLE_ID_IS_REQUIRED
        },
        isString: {
          errorMessage: USER_MESSAGES.ROLE_ID_MUST_BE_A_STRING
        },
        custom: {
          options: (value) => {
            const role = databaseService.roles.findFirst({ where: { id: value } })
            if (!role) {
              throw new Error(USER_MESSAGES.ROLE_NOT_FOUND)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
