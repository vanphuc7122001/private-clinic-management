import { NextFunction, Response, Request } from 'express'
import { MEDICAL_RECORD_MESSAGES } from '~/constants/message'
import { MedicalRecordReqBody } from '~/models/requests/MedicalRecord.requests'
import { IdParams, PaginationQuery } from '~/models/requests/Other.requests'
import medicalRecordService from '~/services/medicalRecord.service'

export const createMedicalRecordController = async (
  req: Request<any, any, MedicalRecordReqBody & { services: string[] }>,
  res: Response,
  next: NextFunction
) => {
  const result = await medicalRecordService.createMedicalRecord({ ...req.body })
  res.json({
    message: MEDICAL_RECORD_MESSAGES.CREATE_MEDICAL_RECORD_SUCCESS,
    result
  })
}

export const getMedicalRecordController = async (req: Request<IdParams>, res: Response, next: NextFunction) => {
  const result = await medicalRecordService.getMedicalRecord(req.params.id)
  res.json({
    message: MEDICAL_RECORD_MESSAGES.GET_MEDICAL_RECORD_SUCCESS,
    result
  })
}

export const getMedicalRecordsController = async (
  req: Request<any, any, any, PaginationQuery>,
  res: Response,
  next: NextFunction
) => {
  const result = await medicalRecordService.getMedicalRecords(req.query)
  res.json({
    message: MEDICAL_RECORD_MESSAGES.GET_MEDICAL_RECORDS_SUCCESS,
    result
  })
}

export const updateMedicalRecordController = async (
  req: Request<IdParams, any, MedicalRecordReqBody & { services: string[] }>,
  res: Response,
  next: NextFunction
) => {
  const result = await medicalRecordService.updateMedicalRecord({ ...req.body, id: req.params.id })
  res.json({
    message: MEDICAL_RECORD_MESSAGES.UPDATE_MEDICAL_RECORD_SUCCESS,
    result
  })
}
