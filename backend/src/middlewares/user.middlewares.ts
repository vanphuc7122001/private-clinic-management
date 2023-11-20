import { ParamSchema, checkSchema } from 'express-validator'
import { USER_MESSAGES } from '~/constants/message'
import { validate } from '~/utils/validation'
import { isLength } from './common.middlewares'
import { stringEnumToArray, verifyAccessToken } from '~/utils/commons'
import { Genders } from '~/constants/enum'
import { Request } from 'express'
import { hashPassword } from '~/utils/crypto'
import { ErrorWithStatus } from '~/models/Errors'
import { USER_EMAIL_REGEX } from '~/constants/regex'

import databaseService from '~/services/database.service'
import HTTP_STATUS from '~/constants/httpStatus'
import { verifyToken } from '~/utils/jwt'
import { envConfig } from '~/constants/config'
import { JsonWebTokenError } from 'jsonwebtoken'

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
        trim: true,
        custom: {
          options: async (value) => {
            const email = await databaseService.users.findFirst({ where: { email: value } })
            if (email) {
              throw new Error(USER_MESSAGES.EMAIL_ALREADY_EXIST)
            }

            return true
          }
        }
      },
      password: {
        ...passwordSchema,
        optional: true,
        notEmpty: undefined
      },
      confirm_password: {
        ...passwordSchema,
        optional: true,
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error(USER_MESSAGES.CONFIRM_PASSWORD_MUST_EQUAL_PASSWORD)
            }

            return true
          }
        }
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
          options: async (value) => {
            const role = await databaseService.roles.findFirst({ where: { id: value } })
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

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        trim: true,
        custom: {
          options: async (value, { req }) => {
            if (!value) {
              throw new Error(USER_MESSAGES.EMAIL_IS_REQUIRED)
            }

            if (!USER_EMAIL_REGEX.test(value)) {
              throw new Error(USER_MESSAGES.EMAIL_IS_INVALID)
            }

            const password = req.body.password
            const user = await databaseService.users.findFirst({
              where: {
                email: value,
                password: hashPassword(password)
              }
            })

            if (!user) {
              throw new ErrorWithStatus({
                message: USER_MESSAGES.EMAIL_OR_PASSWORD_INCORRECT,
                status: HTTP_STATUS.NOT_FOUND
              })
            }

            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: new Error(USER_MESSAGES.PASSWORD_IS_REQUIRED)
        },
        trim: true
      }
    },
    ['body']
  )
)

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value: string, { req }) => {
            const access_token = (value || '').split(' ')[1]
            return await verifyAccessToken(access_token, req as Request)
          }
        }
      }
    },
    ['headers']
  )
)

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                message: USER_MESSAGES.REFRESH_TOKEN_IS_REQUIRED,
                status: HTTP_STATUS.NOT_FOUND
              })
            }
            try {
              const [decoded_refresh_token, refresh_token] = await Promise.all([
                verifyToken({
                  token: value,
                  secretOrPublicKey: envConfig.jwtSecretRefreshToken
                }),
                databaseService.refreshTokens.findFirst({
                  where: {
                    token: value
                  }
                })
              ])

              if (!refresh_token) {
                throw new ErrorWithStatus({
                  message: USER_MESSAGES.USED_REFRESH_TOKEN_OR_NOT_EXIST,
                  status: HTTP_STATUS.UNAUTHORIZED
                })
              }
              decoded_refresh_token.id = refresh_token.id
              ;(req as Request).decoded_refresh_token = decoded_refresh_token
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({
                  message: error.message,
                  status: HTTP_STATUS.UNAUTHORIZED
                })
              }
              throw error
            }

            return true
          }
        }
      }
    },
    ['body']
  )
)
