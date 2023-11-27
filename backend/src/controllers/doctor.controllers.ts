import { NextFunction, Response, Request } from 'express'
import { DOCTOR_MESSAGES } from '~/constants/message'
import { DoctorReqBody } from '~/models/requests/Doctor.requests'
import { IdParams, PaginationQuery } from '~/models/requests/Other.requests'
import doctorService from '~/services/doctor.service'
export const createDoctorController = async (
  req: Request<any, any, DoctorReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await doctorService.createDoctor(req.body)
  res.json({
    message: DOCTOR_MESSAGES.CREATE_DOCTOR_SUCCESS,
    result
  })
}

export const getDoctorController = async (req: Request<IdParams>, res: Response, next: NextFunction) => {
  const result = await doctorService.getDoctor(req.params.id)
  res.json({
    message: DOCTOR_MESSAGES.GET_DOCTOR_SUCCESS,
    result
  })
}

export const getDoctorsController = async (
  req: Request<any, any, any, PaginationQuery>,
  res: Response,
  next: NextFunction
) => {
  const result = await doctorService.getDoctors(req.query)
  res.json({
    message: DOCTOR_MESSAGES.GET_DOCTORS_SUCCESS,
    result
  })
}

export const updateDoctorController = async (
  req: Request<IdParams, any, DoctorReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await doctorService.updateDoctor({ ...req.body, id: req.params.id })
  res.json({
    message: DOCTOR_MESSAGES.UPDATE_DOCTOR_SUCCESS,
    result
  })
}
