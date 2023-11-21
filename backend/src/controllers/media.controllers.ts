import { NextFunction, Request, Response } from 'express'
import { MEDIA_MESSAGES } from '~/constants/message'
import mediaService from '~/services/media.service'

export const uploadSignleImageController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await mediaService.handleUploadSignleImage(req)

  return res.send({
    message: MEDIA_MESSAGES.UPLOAD_IMAGE_SINGLE_SUCCESS,
    result
  })
}
