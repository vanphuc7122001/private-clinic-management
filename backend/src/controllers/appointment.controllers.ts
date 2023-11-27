import { NextFunction, Response, Request } from 'express'
import { APPOINTMENT_MESSAGES } from '~/constants/message'
import { AppointmentReqBody } from '~/models/requests/Appointment.requests'
import { IdParams, PaginationQuery } from '~/models/requests/Other.requests'
import appointmentService from '~/services/appointment.service'
export const createAppointmentController = async (
  req: Request<any, any, AppointmentReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await appointmentService.createAppointment(req.body)
  res.json({
    message: APPOINTMENT_MESSAGES.CREATE_APPOINTMENT_SUCCESS,
    result
  })
}

export const getAppointmentController = async (req: Request<IdParams>, res: Response, next: NextFunction) => {
  const result = await appointmentService.getAppointment(req.params.id)
  res.json({
    message: APPOINTMENT_MESSAGES.GET_APPOINTMENT_SUCCESS,
    result
  })
}

export const getAppointmentsController = async (
  req: Request<any, any, any, PaginationQuery>,
  res: Response,
  next: NextFunction
) => {
  const result = await appointmentService.getAppointments(req.query)
  res.json({
    message: APPOINTMENT_MESSAGES.GET_APPOINTMENTS_SUCCESS,
    result
  })
}

export const updateAppointmentController = async (
  req: Request<IdParams, any, AppointmentReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await appointmentService.updateAppointment({ ...req.body, id: req.params.id })
  res.json({
    message: APPOINTMENT_MESSAGES.UPDATE_APPOINTMENT_SUCCESS,
    result
  })
}

export const deleteAppointmentController = async (req: Request<IdParams>, res: Response, next: NextFunction) => {
  await appointmentService.deleteAppointment(req.params.id)
  res.json({
    message: APPOINTMENT_MESSAGES.DELETE_APPOINTMENT_SUCCESS
  })
}
