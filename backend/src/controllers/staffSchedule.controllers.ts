import { NextFunction, Response, Request } from 'express'
import { STAFF_SCHEDULE_MESSAGES } from '~/constants/message'
import { IdParams, PaginationQuery } from '~/models/requests/Other.requests'
import { StaffScheduleReqBody } from '~/models/requests/StaffSchedule.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import staffScheduleService from '~/services/staffSchedule.service'
export const createStaffScheduleController = async (
  req: Request<any, any, StaffScheduleReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await staffScheduleService.createStaffSchedule(req.body)
  res.json({
    message: STAFF_SCHEDULE_MESSAGES.CREATE_STAFF_SCHEDULE_SUCCESS,
    result
  })
}

export const getStaffSchedulesController = async (
  req: Request<any, any, any, PaginationQuery>,
  res: Response,
  next: NextFunction
) => {
  const result = await staffScheduleService.getStaffSchedules(req.query)
  res.json({
    message: STAFF_SCHEDULE_MESSAGES.GET_STAFF_SCHEDULES_SUCCESS,
    result
  })
}

export const getStaffSchedulesControllerOfUser = async (
  req: Request<any, any, any, PaginationQuery>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await staffScheduleService.getStaffSchedulesUser({ payload: req.query, user_id: user_id })
  res.json({
    message: STAFF_SCHEDULE_MESSAGES.GET_STAFF_SCHEDULES_SUCCESS,
    result
  })
}

export const updateStaffScheduleController = async (
  req: Request<IdParams, any, StaffScheduleReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await staffScheduleService.updateStaffSchedule({ ...req.body, id: req.params.id })
  res.json({
    message: STAFF_SCHEDULE_MESSAGES.UPDATE_STAFF_SCHEDULE_SUCCESS,
    result
  })
}
