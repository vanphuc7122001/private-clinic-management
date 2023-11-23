import { NextFunction, Response, Request } from 'express'
import { APPOINTMENT_MESSAGES } from '~/constants/message'
export const createAppointmentController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: APPOINTMENT_MESSAGES.CREATE_APPOINTMENT_SUCCESS
  })
}

export const getAppointmentController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: APPOINTMENT_MESSAGES.GET_APPOINTMENT_SUCCESS
  })
}

export const getAppointmentsController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: APPOINTMENT_MESSAGES.GET_APPOINTMENTS_SUCCESS
  })
}

export const updateAppointmentController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: APPOINTMENT_MESSAGES.UPDATE_APPOINTMENT_SUCCESS
  })
}

export const deleteAppointmentController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: APPOINTMENT_MESSAGES.DELETE_APPOINTMENT_SUCCESS
  })
}
