import { Roles } from './../constants/enum'
import { validate } from '~/utils/validation'
import { checkSchema } from 'express-validator'
import { stringEnumToArray } from '~/utils/commons'
import { ROLE_MESSAGES } from '~/constants/message'
import databaseService from '~/services/database.service'

const roleTypes = stringEnumToArray(Roles)

export const createRoleValidator = validate(
  checkSchema(
    {
      name: {
        custom: {
          options: async (value) => {
            if (!value) {
              throw new Error(ROLE_MESSAGES.ROLE_IS_REQUIRED)
            }

            const role = await databaseService.roles.findFirst({
              where: {
                name: value
              }
            })
            if (role) {
              throw new Error(`Role ${value} already exists`)
            }

            return true
          }
        },
        isIn: {
          options: [roleTypes],
          errorMessage: `Role type must be one of ${roleTypes}`
        }
      }
    },
    ['body']
  )
)
