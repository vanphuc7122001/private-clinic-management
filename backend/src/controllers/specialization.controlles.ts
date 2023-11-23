import { NextFunction, Request, Response } from 'express'
import { SPECIALLIZATION_MESSAGES } from '~/constants/message'

export const createSpecializationController = (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    message: SPECIALLIZATION_MESSAGES.CREATE_SPECIALIZATION_SUCCESS
  })
}

export const getCaterogiesController = (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    message: SPECIALLIZATION_MESSAGES.GET_ALL_SPECIALIZATIONS_SUCCESS
  })
}

export const updateSpecialization = (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    message: SPECIALLIZATION_MESSAGES.UPDATE_SPECIALIZATION_SUCCESS
  })
}

export const deleteSpecialization = (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    message: SPECIALLIZATION_MESSAGES.DELETE_SPECIALIZATION_SUCCESS
  })
}
