import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'
const env = process.env.NODE_ENV
const envFilename = `.env.${env}`

if (!env) {
  console.log(`You haven't provided a NODE_ENV environment variable (e.g. development, production)`)
  console.log(`Detect NODE_ENV = ${env}`)
  process.exit(1)
}
console.log(`Detect NODE_ENV = ${env}, So the app will use the environment file ${envFilename}`)
if (!fs.existsSync(path.resolve(envFilename))) {
  console.log(`No environment file found ${envFilename}`)
  console.log(
    `Note: The app does not use the .env file. For example, if the environment is development, the app will use the .env.development file.`
  )
  console.log(`Please create file ${envFilename} and refer to the content in file .env.example`)
  process.exit(1)
}
config({
  path: envFilename
})
export const isProduction = env === 'production'

export const envConfig = {
  //DATABASE
  databaseUrl: process.env.DATABASE_URL as string,
  // SERVER
  host: process.env.HOST as string,
  port: Number(process.env.PORT as string),
  //CLIENT
  clientUrl: process.env.CLIENT_URL as string,
  // JWT
  jwtSecretForgotPasswordToken: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string,
  jwtSecretRefreshToken: process.env.JWT_SECRET_REFRESH_TOKEN as string,
  jwtEmailVerifyToken: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,
  jwtSecretAccessToken: process.env.JWT_SECRET_ACCESS_TOKEN as string,

  //EXPIRED_TOKEN
  jwtExpiredAccessToken: process.env.EXPRIES_IN_ACCESS_TOKEN as string,
  jwtExpiredRefreshToken: process.env.EXPRIES_IN_REFRESH_TOKEN as string,
  jwtExpiredEmailVerifyToken: process.env.EXPRIES_IN_EMAIL_VERIFY_TOKEN as string,
  jwtExpiredForGotPassworToken: process.env.EXPRIES_IN_FORGOT_PASSWORD_TOKEN as string,
  //DB
  dbUserName: process.env.DB_USERNAME as string,
  dbPassword: process.env.DB_PASSWORD as string,
  dbName: process.env.DB_NAME as string,
  // SALT HASH PASSWORD
  passwordSecret: process.env.PASSWORD_SECRET as string,
  //AMAZON WEB SERVICE
  awsRegion: process.env.AWS_REGION as string,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  // SES
  sesFromAddress: process.env.SES_FROM_ADDRESS as string,
  //S3 BUCKET,
  s3Bucket: process.env.AWS_BUCKET_S3 as string
}
