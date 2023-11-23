import { NextFunction, Response, Request } from 'express'
import { STAFF_SCHEDULE_MESSAGES } from '~/constants/message'
export const createStaffScheduleController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: STAFF_SCHEDULE_MESSAGES.CREATE_STAFF_SCHEDULE_SUCCESS
  })
}

export const getStaffScheduleController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: STAFF_SCHEDULE_MESSAGES.GET_STAFF_SCHEDULE_SUCCESS
  })
}

export const getStaffSchedulesController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: STAFF_SCHEDULE_MESSAGES.GET_STAFF_SCHEDULES_SUCCESS
  })
}

export const updateStaffScheduleController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: STAFF_SCHEDULE_MESSAGES.UPDATE_STAFF_SCHEDULE_SUCCESS
  })
}
