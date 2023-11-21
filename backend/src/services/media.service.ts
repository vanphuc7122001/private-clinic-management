import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_IMAGES_DIR } from '~/constants/dir'
import { getNameFromFullName, handleUploadSignleImage } from '~/utils/file'
import { uploadFileToS3 } from '~/utils/s3'
import fsPromise from 'fs/promises'
import mime from 'mime'
import { CompleteMultipartUploadCommandOutput } from '@aws-sdk/client-s3'

class MediaService {
  async handleUploadSignleImage(req: Request) {
    const file = await handleUploadSignleImage(req)
    const newName = getNameFromFullName(file.newFilename)
    const newFullFileName = `${newName}.jpg`
    const newPath = path.resolve(UPLOAD_IMAGES_DIR, newFullFileName)
    await sharp(file.filepath).jpeg().toFile(newPath)
    const s3Result = await uploadFileToS3({
      filename: newFullFileName,
      filepath: newPath,
      contentType: mime.getType(newPath) as string
    })
    await Promise.all([fsPromise.unlink(file.filepath), fsPromise.unlink(newPath)])
    return {
      url: (s3Result as CompleteMultipartUploadCommandOutput).Location as string
    }
  }
}

const mediaService = new MediaService()
export default mediaService
