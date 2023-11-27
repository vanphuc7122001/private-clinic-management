import { NextFunction, Response, Request } from 'express'
import { PRESCRIPTION_MESSAGES } from '~/constants/message'
import { IdParams } from '~/models/requests/Other.requests'
import { PrescriptionReqBody } from '~/models/requests/Prescription.requests'
import prescriptionService from '~/services/prescription.service'
export const createPrescriptionController = async (
  req: Request<any, any, PrescriptionReqBody & { medicines: any[] }>,
  res: Response,
  next: NextFunction
) => {
  const result = await prescriptionService.createPrescription({ ...req.body })
  res.json({
    message: PRESCRIPTION_MESSAGES.CREATE_PRESCRIPTION_SUCCESS,
    result
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

export const updatePrescriptionController = async (
  req: Request<IdParams, any, PrescriptionReqBody & { medicines: any[] }>,
  res: Response,
  next: NextFunction
) => {
  const result = await prescriptionService.updatePrescription({ ...req.body, id: req.params.id })

  res.json({
    message: PRESCRIPTION_MESSAGES.UPDATE_PRESCRIPTION_SUCCESS,
    result
  })
}

export const deletePrescriptionController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: PRESCRIPTION_MESSAGES.DELETE_PRESCRIPTION_SUCCESS
  })
}
