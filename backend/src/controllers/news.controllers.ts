import { NextFunction, Request, Response } from 'express'
import { NEWS_MESSAGES } from '~/constants/message'
import { NewsReqBody } from '~/models/requests/News.requests'
import { IdParams, PaginationQuery } from '~/models/requests/Other.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import newsService from '~/services/news.service'
export const createNewsController = async (req: Request<any, any, NewsReqBody>, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await newsService.createNews({ ...req.body, user_id })
  res.json({
    message: NEWS_MESSAGES.CREATE_NEWS_SUCCESS,
    result
  })
}

export const getAllNewsController = async (
  req: Request<any, any, any, PaginationQuery>,
  res: Response,
  next: NextFunction
) => {
  const result = await newsService.getAllNews(req.query)
  res.json({
    message: NEWS_MESSAGES.GET_ALL_NEWS_SUCCESS,
    result
  })
}

export const getNewsController = async (req: Request<IdParams>, res: Response, next: NextFunction) => {
  const id = req.params.id
  const result = await newsService.getNews(id)
  res.json({
    message: NEWS_MESSAGES.GET_NEWS_SUCCESS,
    result
  })
}

export const updateNewsController = async (
  req: Request<IdParams, any, NewsReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await newsService.updateNews({ ...req.body, id: req.params.id })
  res.json({
    message: NEWS_MESSAGES.UPDATE_NEWS_SUCCESS,
    result
  })
}

export const deleteNewsController = async (req: Request<IdParams>, res: Response, next: NextFunction) => {
  await newsService.deleteNews(req.params.id)
  res.json({
    message: NEWS_MESSAGES.DELETE_NEWS_SUCCESS
  })
}
