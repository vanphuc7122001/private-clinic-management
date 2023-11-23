import { NextFunction, Response, Request } from 'express'
import { PRESCRIPTION_MESSAGES } from '~/constants/message'
export const createPrescriptionController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: PRESCRIPTION_MESSAGES.CREATE_PRESCRIPTION_SUCCESS
  })
}

export const getPrescriptionController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: PRESCRIPTION_MESSAGES.GET_PRESCRIPTION_SUCCESS
  })
}

export const getPrescriptionsController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: PRESCRIPTION_MESSAGES.GET_PRESCRIPTIONS_SUCCESS
  })
}

export const updatePrescriptionController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: PRESCRIPTION_MESSAGES.UPDATE_PRESCRIPTION_SUCCESS
  })
}

export const deletePrescriptionController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: PRESCRIPTION_MESSAGES.DELETE_PRESCRIPTION_SUCCESS
  })
}
