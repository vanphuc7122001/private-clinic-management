import { NextFunction, Request, Response } from 'express'
import { MEDICINE_MESSAGES } from '~/constants/message'
import { MedicineReqBody } from '~/models/requests/Medicine.requests'
import { IdParams, PaginationQuery } from '~/models/requests/Other.requests'
import medicineService from '~/services/medicine.service'
export const createMedicineController = async (
  req: Request<any, any, MedicineReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await medicineService.createMedicine(req.body)
  res.json({
    message: MEDICINE_MESSAGES.CREATE_MEDICINE_SUCCESS,
    result
  })
}

export const getMedicinesController = async (
  req: Request<any, any, any, PaginationQuery>,
  res: Response,
  next: NextFunction
) => {
  const result = await medicineService.getMedicines(req.query)

  res.json({
    message: MEDICINE_MESSAGES.GET_ALL_MEDICINE_SUCCESS,
    result
  })
}

export const updateMedicineController = async (
  req: Request<IdParams, any, MedicineReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const result = await medicineService.updateMedicine({ ...req.body, id })
  res.json({
    message: MEDICINE_MESSAGES.UPDATE_MEDICINE_SUCCESS,
    result
  })
}

export const deleteMedicineController = async (req: Request<IdParams>, res: Response, next: NextFunction) => {
  await medicineService.deleteMedicine(req.params.id)
  res.json({
    message: MEDICINE_MESSAGES.DELETE_MEDICINE_SUCCESS
  })
}
