import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'
const env = process.env.NODE_ENV
const envFilename = `.env.${env}`

if (!env) {
  console.log(`Bạn chưa cung cấp biến môi trường NODE_ENV (ví dụ: development, production)`)
  console.log(`Phát hiện NODE_ENV = ${env}`)
  process.exit(1)
}
console.log(`Phát hiện NODE_ENV = ${env}, vì thế app sẽ dùng file môi trường là ${envFilename}`)
if (!fs.existsSync(path.resolve(envFilename))) {
  console.log(`Không tìm thấy file môi trường ${envFilename}`)
  console.log(`Lưu ý: App không dùng file .env, ví dụ môi trường là development thì app sẽ dùng file .env.development`)
  console.log(`Vui lòng tạo file ${envFilename} và tham khảo nội dung ở file .env.example`)
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
