import { NextFunction, Response, Request } from 'express'
import { BILL_MESSAGES } from '~/constants/message'
export const createBillController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: BILL_MESSAGES.CREATE_BILL_SUCCESS
  })
}

export const getBillController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: BILL_MESSAGES.GET_BILL_SUCCESS
  })
}

export const getBillsController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: BILL_MESSAGES.GET_BILLS_SUCCESS
  })
}

export const updateBillController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: BILL_MESSAGES.UPDATE_BILL_SUCCESS
  })
}

export const deleteBillController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: BILL_MESSAGES.DELETE_BILL_SUCCESS
  })
}
