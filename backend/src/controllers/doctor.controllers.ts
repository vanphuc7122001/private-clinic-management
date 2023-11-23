import { NextFunction, Response, Request } from 'express'
import { DOCTOR_MESSAGES } from '~/constants/message'
export const createDoctorController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: DOCTOR_MESSAGES.CREATE_DOCTOR_SUCCESS
  })
}

export const getDoctorController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: DOCTOR_MESSAGES.GET_DOCTOR_SUCCESS
  })
}

export const getDoctorsController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: DOCTOR_MESSAGES.GET_DOCTORS_SUCCESS
  })
}

export const updateDoctorController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: DOCTOR_MESSAGES.UPDATE_DOCTOR_SUCCESS
  })
}

export const deleteDoctorController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: DOCTOR_MESSAGES.DELETE_DOCTOR_SUCCESS
  })
}
