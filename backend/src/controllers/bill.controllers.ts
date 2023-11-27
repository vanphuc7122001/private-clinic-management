import { NextFunction, Response, Request } from 'express'
import { BILL_MESSAGES } from '~/constants/message'
import { BillReqBody } from '~/models/requests/Bill.schema.request'
import { IdParams, PaginationQuery } from '~/models/requests/Other.requests'
import billService from '~/services/bill.service'
export const createBillController = async (req: Request<any, any, BillReqBody>, res: Response, next: NextFunction) => {
  const result = await billService.createBill(req.body)
  res.json({
    message: BILL_MESSAGES.CREATE_BILL_SUCCESS,
    result
  })
}

export const getBillController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: BILL_MESSAGES.GET_BILL_SUCCESS
  })
}

export const getBillsController = async (
  req: Request<any, any, any, PaginationQuery>,
  res: Response,
  next: NextFunction
) => {
  const result = await billService.getBills(req.query)
  res.json({
    message: BILL_MESSAGES.GET_BILLS_SUCCESS,
    result
  })
}

export const updateBillController = async (
  req: Request<IdParams, any, BillReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await billService.updateBill({ ...req.body, id: req.params.id })

  res.json({
    message: BILL_MESSAGES.UPDATE_BILL_SUCCESS,
    result
  })
}

export const deleteBillController = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: BILL_MESSAGES.DELETE_BILL_SUCCESS
  })
}
