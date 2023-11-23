import { NextFunction, Response, Request } from 'express'
import { DOCTOR_MESSAGES, MEDICAL_RECORD_MESSAGES } from '~/constants/message'
export const createMedicalRecordController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: MEDICAL_RECORD_MESSAGES.CREATE_MEDICAL_RECORD_SUCCESS
  })
}

export const getMedicalRecordController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: MEDICAL_RECORD_MESSAGES.GET_MEDICAL_RECORD_SUCCESS
  })
}

export const getMedicalRecordsController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: MEDICAL_RECORD_MESSAGES.GET_MEDICAL_RECORDS_SUCCESS
  })
}

export const updateMedicalRecordController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: MEDICAL_RECORD_MESSAGES.UPDATE_MEDICAL_RECORD_SUCCESS
  })
}

export const deleteMedicalRecordController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: MEDICAL_RECORD_MESSAGES.DELETE_MEDICAL_RECORD_SUCCESS
  })
}
