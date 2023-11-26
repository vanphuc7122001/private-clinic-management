import { NewsReqBody } from '~/models/requests/News.requests'
import databaseService from './database.service'
import News from '~/models/schemas/News.schema'
import { PaginationQuery } from '~/models/requests/Other.requests'
import { envConfig } from '~/constants/config'
import { omit } from 'lodash'

class NewsService {
  async createNews(payload: NewsReqBody & { user_id: string }) {
    const result = await databaseService.news.create({
      data: new News({
        ...payload
      })
    })

    return result
  }

  async getAllNews(payload: PaginationQuery) {
    const page = Number(payload.page as string) || envConfig.page
    const limit = Number(payload.limit as string) || envConfig.limit
    const { ...query } = omit(payload, ['limit', 'page'])
    const where: any = {}
    if (query) {
      for (const key in query) {
        where[key] = {
          contains: query[key]
        }
      }
    }
    const [total, news] = await Promise.all([
      databaseService.news.count({
        where
      }),
      databaseService.news.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit
      })
    ])

    return {
      page,
      limit,
      news,
      total_page: Math.ceil(total / limit) || 0,
      total_record: total || 0
    }
  }

  async getNews(id: string) {
    const result = await databaseService.news.findFirst({
      where: {
        id
      }
    })

    return result
  }

  async updateNews(payload: NewsReqBody & { id: string }) {
    const result = await databaseService.news.update({
      where: {
        id: payload.id
      },
      data: {
        ...omit(payload, ['id'])
      }
    })

    return result
  }

  async deleteNews(id: string) {
    await databaseService.news.delete({
      where: {
        id
      }
    })
  }
}

const newsService = new NewsService()
export default newsService
