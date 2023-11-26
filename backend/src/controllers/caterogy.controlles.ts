import { NextFunction, Request, Response } from 'express'
import { CATEROGY_MESSAGES } from '~/constants/message'
import { CaterogyReqBody } from '~/models/requests/Caterogy.requests'
import { IdParams } from '~/models/requests/Other.requests'
import caterogyService from '~/services/caterogy.service'

export const createCaterogyController = async (
  req: Request<any, any, CaterogyReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await caterogyService.createCaterory(req.body)

  return res.json({
    message: CATEROGY_MESSAGES.CREATE_CATEROGY_SUCCESS,
    result
  })
}

export const getCaterogiesController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await caterogyService.getCaterogies()
  return res.json({
    message: CATEROGY_MESSAGES.GET_ALL_CATEROGIES_SUCCESS,
    result
  })
}

export const updateCaterogy = async (
  req: Request<IdParams, any, CaterogyReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await caterogyService.updateCaterogy({ ...req.body, id: req.params.id })
  return res.json({
    message: CATEROGY_MESSAGES.UPDATE_CATEROGY_SUCCESS,
    result
  })
}

export const deleteCaterogy = async (req: Request<IdParams>, res: Response, next: NextFunction) => {
  await caterogyService.deleteCaterogy(req.params.id)
  return res.json({
    message: CATEROGY_MESSAGES.DELETE_CATEROGY_SUCCESS
  })
}
