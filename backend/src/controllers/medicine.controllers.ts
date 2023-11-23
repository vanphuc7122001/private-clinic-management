import { NextFunction, Request, Response } from 'express'
import { MEDICINE_MESSAGES } from '~/constants/message'
export const createMedicineController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: MEDICINE_MESSAGES.CREATE_MEDICINE_SUCCESS
  })
}

export const getMedicinesController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: MEDICINE_MESSAGES.CREATE_MEDICINE_SUCCESS
  })
}

export const updateMedicineController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: MEDICINE_MESSAGES.UPDATE_MEDICINE_SUCCESS
  })
}

export const deleteMedicineController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: MEDICINE_MESSAGES.DELETE_MEDICINE_SUCCESS
  })
}
