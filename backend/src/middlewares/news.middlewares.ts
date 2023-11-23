import { ParamSchema, checkSchema } from 'express-validator'
import { NEWS_MESSAGES } from '~/constants/message'
import { validate } from '~/utils/validation'
import { isLength } from './common.middlewares'

const stringEmptySchema = ({
  messageString,
  messageEmpty
}: {
  messageString: string
  messageEmpty: string
}): ParamSchema => {
  return {
    isString: {
      errorMessage: messageString
    },
    notEmpty: {
      errorMessage: messageEmpty
    },
    trim: true
  }
}

export const createNewsValidator = validate(
  checkSchema(
    {
      title: {
        ...stringEmptySchema({
          messageString: NEWS_MESSAGES.TITLE_MUST_BE_A_STRING,
          messageEmpty: NEWS_MESSAGES.TITLE_IS_REQUIRED
        }),
        isLength: isLength({ min: 1, max: 100, name: 'News', field: 'Title' })
      },
      images: stringEmptySchema({
        messageString: NEWS_MESSAGES.IMAGES_MUST_BE_A_STRING,
        messageEmpty: NEWS_MESSAGES.IMAGES_IS_REQUIRED
      }),
      description: stringEmptySchema({
        messageEmpty: NEWS_MESSAGES.DESC_IS_REQUIRED,
        messageString: NEWS_MESSAGES.DESC_MUST_BE_A_STRING
      }),
      content: stringEmptySchema({
        messageString: NEWS_MESSAGES.CONTENT_MUST_BE_A_STRING,
        messageEmpty: NEWS_MESSAGES.CONTENT_IS_REQUIRED
      })
    },
    ['body']
  )
)

export const updateNewsValidator = validate(
  checkSchema(
    {
      title: {
        ...stringEmptySchema({
          messageString: NEWS_MESSAGES.TITLE_MUST_BE_A_STRING,
          messageEmpty: NEWS_MESSAGES.TITLE_IS_REQUIRED
        }),
        isLength: isLength({ min: 1, max: 100, name: 'News', field: 'Title' }),
        notEmpty: undefined,
        optional: true
      },
      images: {
        ...stringEmptySchema({
          messageString: NEWS_MESSAGES.IMAGES_MUST_BE_A_STRING,
          messageEmpty: NEWS_MESSAGES.IMAGES_IS_REQUIRED
        }),
        notEmpty: undefined,
        optional: true
      },
      description: {
        ...stringEmptySchema({
          messageEmpty: NEWS_MESSAGES.DESC_IS_REQUIRED,
          messageString: NEWS_MESSAGES.DESC_MUST_BE_A_STRING
        }),
        notEmpty: undefined,
        optional: true
      },
      content: {
        ...stringEmptySchema({
          messageString: NEWS_MESSAGES.CONTENT_MUST_BE_A_STRING,
          messageEmpty: NEWS_MESSAGES.CONTENT_IS_REQUIRED
        }),
        notEmpty: undefined,
        optional: true
      }
    },
    ['body']
  )
)
