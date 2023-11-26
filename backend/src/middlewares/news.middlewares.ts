import { ParamSchema, checkSchema } from 'express-validator'
import { NEWS_MESSAGES } from '~/constants/message'
import { validate } from '~/utils/validation'
import { isLength, stringEmptySchema } from './common.middlewares'
import databaseService from '~/services/database.service'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'

const titleSchema: ParamSchema = {
  ...stringEmptySchema({
    messageString: NEWS_MESSAGES.TITLE_MUST_BE_A_STRING,
    messageEmpty: NEWS_MESSAGES.TITLE_IS_REQUIRED
  }),
  isLength: isLength({ min: 1, max: 100, name: 'News', field: 'Title' })
}

const imagesSchema: ParamSchema = {
  ...stringEmptySchema({
    messageString: NEWS_MESSAGES.IMAGES_MUST_BE_A_STRING,
    messageEmpty: NEWS_MESSAGES.IMAGES_IS_REQUIRED
  }),
  isLength: isLength({ min: 1, max: 200, name: 'News', field: 'images' })
}

const descriptionSchema: ParamSchema = stringEmptySchema({
  messageEmpty: NEWS_MESSAGES.DESC_IS_REQUIRED,
  messageString: NEWS_MESSAGES.DESC_MUST_BE_A_STRING
})

const contentSchema: ParamSchema = stringEmptySchema({
  messageString: NEWS_MESSAGES.CONTENT_MUST_BE_A_STRING,
  messageEmpty: NEWS_MESSAGES.CONTENT_IS_REQUIRED
})

const caterogyIdSchema: ParamSchema = {
  ...stringEmptySchema({
    messageString: NEWS_MESSAGES.CONTENT_MUST_BE_A_STRING,
    messageEmpty: NEWS_MESSAGES.CONTENT_IS_REQUIRED
  }),
  custom: {
    options: async (value, { req }) => {
      const isCaterogy = await databaseService.caterogies.findFirst({
        where: {
          id: value
        }
      })

      if (!isCaterogy) {
        throw new Error(NEWS_MESSAGES.CATEROGY_NOT_FOUND)
      }

      return true
    }
  }
}

const idSchema: ParamSchema = {
  notEmpty: {
    errorMessage: new ErrorWithStatus({
      message: NEWS_MESSAGES.ID_IS_REQUIRED,
      status: HTTP_STATUS.BAD_REQUEST
    })
  },
  custom: {
    options: async (value) => {
      const isId = await databaseService.news.findFirst({
        where: {
          id: value
        }
      })
      if (!isId) {
        throw new ErrorWithStatus({
          message: NEWS_MESSAGES.NEWS_NOT_FOUND,
          status: HTTP_STATUS.NOT_FOUND
        })
      }

      return true
    }
  }
}

export const createNewsValidator = validate(
  checkSchema(
    {
      title: titleSchema,
      images: imagesSchema,
      description: descriptionSchema,
      content: contentSchema,
      category_id: caterogyIdSchema
    },
    ['body']
  )
)

export const updateNewsValidator = validate(
  checkSchema(
    {
      id: idSchema,
      title: titleSchema,
      images: imagesSchema,
      description: descriptionSchema,
      content: contentSchema,
      category_id: caterogyIdSchema
    },
    ['body', 'params']
  )
)

export const getOrDeleteNewsValidator = validate(
  checkSchema(
    {
      id: idSchema
    },
    ['params']
  )
)
