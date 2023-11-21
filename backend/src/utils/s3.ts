import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { envConfig } from '~/constants/config'
import fs from 'fs'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { MEDIA_MESSAGES } from '~/constants/message'

// import path from 'path'

const s3 = new S3({
  region: envConfig.awsRegion,
  credentials: {
    secretAccessKey: envConfig.awsSecretAccessKey,
    accessKeyId: envConfig.awsAccessKeyId
  }
})

// const filepath = fs.readFileSync(path.resolve('uploads', 'images', '8548fb02abbc94b20d825a100.jpg'))

export const uploadFileToS3 = ({
  filename,
  filepath,
  contentType
}: {
  filename: string
  filepath: string
  contentType: string
}) => {
  const parallelUploads3 = new Upload({
    client: s3,
    params: {
      Bucket: envConfig.s3Bucket,
      Key: filename,
      Body: fs.readFileSync(filepath),
      ContentType: contentType
    },

    tags: [
      /*...*/
    ], // optional tags
    queueSize: 4, // optional concurrency configuration
    partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
    leavePartsOnError: false // optional manually handle dropped parts
  })

  return parallelUploads3.done()
}

export const deleteFileS3 = async (key: string) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_S3,
    Key: key
  }

  try {
    await s3.deleteObject(params)
  } catch (error) {
    return new ErrorWithStatus({
      message: MEDIA_MESSAGES.ERROR_WHEN_DELETE_IMAGE,
      status: HTTP_STATUS.BAD_REQUEST
    })
  }
}

export const updateFileS3 = async ({
  key,
  newImage,
  contentType
}: {
  key: string
  newImage: string
  contentType: string
}) => {
  const params = {
    Bucket: envConfig.s3Bucket,
    Key: key,
    Body: fs.readFileSync(newImage),
    ContentType: contentType
  }
  try {
    await s3.putObject(params)
  } catch (err) {
    return new ErrorWithStatus({
      message: MEDIA_MESSAGES.ERROR_WHEN_UPDATE_IMAGE,
      status: HTTP_STATUS.BAD_REQUEST
    })
  }
}
