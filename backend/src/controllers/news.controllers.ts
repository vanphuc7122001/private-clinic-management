import { NextFunction, Request, Response } from 'express'
import { NEWS_MESSAGES } from '~/constants/message'
import { CreateNewsReqBody } from '~/models/requests/News.request'
export const createNewsController = (req: Request<any, any, CreateNewsReqBody>, res: Response, next: NextFunction) => {
  res.json({
    message: NEWS_MESSAGES.CREATE_NEWS_SUCCESS
  })
}

export const getAllNewsController = (req: Request<any, any, CreateNewsReqBody>, res: Response, next: NextFunction) => {
  res.json({
    message: NEWS_MESSAGES.GET_ALL_NEWS_SUCCESS
  })
}

export const getNewsController = (req: Request<any, any, CreateNewsReqBody>, res: Response, next: NextFunction) => {
  res.json({
    message: NEWS_MESSAGES.GET_NEWS_SUCCESS
  })
}

export const updateNewsController = (req: Request<any, any, CreateNewsReqBody>, res: Response, next: NextFunction) => {
  res.json({
    message: NEWS_MESSAGES.UPDATE_NEWS_SUCCESS
  })
}

export const deleteNewsController = (req: Request<any, any, CreateNewsReqBody>, res: Response, next: NextFunction) => {
  res.json({
    message: NEWS_MESSAGES.DELETE_NEWS_SUCCESS
  })
}
