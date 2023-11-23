import { NextFunction, Response, Request } from 'express'
import { PRESCRIPTION_DETAIL_MESSAGES } from '~/constants/message'
export const createPrescriptionDetailController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: PRESCRIPTION_DETAIL_MESSAGES.CREATE_PRESCRIPTION_DETAIL_SUCCESS
  })
}

export const getPrescriptionDetailController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: PRESCRIPTION_DETAIL_MESSAGES.GET_PRESCRIPTION_DETAIL_SUCCESS
  })
}

export const getPrescriptionDetailsController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: PRESCRIPTION_DETAIL_MESSAGES.GET_PRESCRIPTION_DETAILS_SUCCESS
  })
}

export const updatePrescriptionDetailController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: PRESCRIPTION_DETAIL_MESSAGES.UPDATE_PRESCRIPTION_DETAIL_SUCCESS
  })
}

export const deletePrescriptionDetailController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: PRESCRIPTION_DETAIL_MESSAGES.DELETE_PRESCRIPTION_DETAIL_SUCCESS
  })
}
