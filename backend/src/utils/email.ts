import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses'
import { envConfig } from '~/constants/config'

import path from 'path'
import fs from 'fs'
// Create SES service object.
const sesClient = new SESClient({
  region: envConfig.awsRegion,
  credentials: {
    secretAccessKey: envConfig.awsSecretAccessKey,
    accessKeyId: envConfig.awsAccessKeyId
  }
})

const emailRegisterTemplate = fs.readFileSync(path.resolve('src', 'templates', 'register.html'), 'utf-8')
const emailForgotPasswordTemplate = fs.readFileSync(
  path.resolve('src', 'templates', 'forgot-password-token.html'),
  'utf-8'
)

const createSendEmailCommand = ({
  fromAddress,
  toAddresses,
  ccAddresses = [],
  body,
  subject,
  replyToAddresses = []
}: {
  fromAddress: string
  toAddresses: string | string[]
  ccAddresses?: string | string[]
  body: string
  subject: string
  replyToAddresses?: string | string[]
}) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: ccAddresses instanceof Array ? ccAddresses : [ccAddresses],
      ToAddresses: toAddresses instanceof Array ? toAddresses : [toAddresses]
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: body
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    Source: fromAddress,
    ReplyToAddresses: replyToAddresses instanceof Array ? replyToAddresses : [replyToAddresses]
  })
}

export const sendEmail = async ({ toAddress, subject, body }: { toAddress: string; subject: string; body: string }) => {
  const sendEmailCommand = createSendEmailCommand({
    fromAddress: envConfig.sesFromAddress,
    toAddresses: toAddress,
    body,
    subject
  })

  return sesClient.send(sendEmailCommand)
}

export const sendEmailRegister = ({
  toAddress,
  subject,
  title,
  content,
  template = emailRegisterTemplate
}: {
  toAddress: string
  subject: string
  title: string
  content: string
  template?: string
}) => {
  return sendEmail({
    toAddress,
    subject,
    body: template.replace('{{title}}', title).replace('{{content}}', content)
  })
}

export const sendForgotPasswrodEmail = ({
  toAddress,
  subject,
  forgot_password_token,
  template = emailForgotPasswordTemplate
}: {
  toAddress: string
  subject: string
  forgot_password_token: string
  template?: string
}) => {
  return sendEmail({
    toAddress,
    subject,
    body: template
      .replace('{{title}}', 'You are receiving this email because you requested to reset your password')
      .replace('{{content}}', 'Click the button below to reset your password')
      .replace('{{titleLink}}', 'Reset password')
      .replace(
        '{{link}}',
        `${envConfig.host}/api/v1/users/verify-forgot-password?forgot_password_token=${forgot_password_token}`
      )
  })
}
