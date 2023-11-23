import { NextFunction, Request, Response } from 'express'
import { CATEROGY_MESSAGES } from '~/constants/message'

export const createCaterogyController = (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    message: CATEROGY_MESSAGES.CREATE_CATEROGY_SUCCESS
  })
}

export const getCaterogiesController = (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    message: CATEROGY_MESSAGES.GET_ALL_CATEROGIES_SUCCESS
  })
}

export const updateCaterogy = (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    message: CATEROGY_MESSAGES.UPDATE_CATEROGY_SUCCESS
  })
}

export const deleteCaterogy = (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    message: CATEROGY_MESSAGES.DELETE_CATEROGY_SUCCESS
  })
}
