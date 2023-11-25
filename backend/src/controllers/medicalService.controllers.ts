import { NextFunction, Request, Response } from 'express'
import { MEDICAL_SERVICE_MESSAGES } from '~/constants/message'
import { MedicalServiceReqBody } from '~/models/requests/MedicalService.requests'
import { IdParams, PaginationQuery } from '~/models/requests/Other.requests'
import medicalService from '~/services/medical.service'
export const createMedicalServiceController = async (
  req: Request<any, any, MedicalServiceReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await medicalService.createMedicalService(req.body)
  res.json({
    message: MEDICAL_SERVICE_MESSAGES.CREATE_MEDICAL_SERVICE_SUCCESS,
    result
  })
}

export const getMedicalServiceController = async (
  req: Request<any, any, any, PaginationQuery>,
  res: Response,
  next: NextFunction
) => {
  const result = await medicalService.getMedicalServices(req.query)

  res.json({
    message: MEDICAL_SERVICE_MESSAGES.GET_ALL_MEDICAL_SERVICES_SUCCESS,
    result
  })
}
export const updateMedicalServiceController = async (
  req: Request<IdParams, any, MedicalServiceReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await medicalService.updateMedicalService({ ...req.body, id: req.params.id })
  res.json({
    message: MEDICAL_SERVICE_MESSAGES.UPDATE_MEDICAL_SERVICE_SUCCESS,
    result
  })
}

export const deleteMedicalServiceController = async (req: Request<IdParams>, res: Response, next: NextFunction) => {
  await medicalService.deleteMedicalService(req.params.id)
  res.json({
    message: MEDICAL_SERVICE_MESSAGES.DELETE_MEDICAL_SERVICE_SUCCESS
  })
}
