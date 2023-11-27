import { omit } from 'lodash'
import { BillReqBody } from '~/models/requests/Bill.schema.request'
import databaseService from './database.service'
import Bill from '~/models/schemas/Bill.schema'
import { PaginationQuery } from '~/models/requests/Other.requests'
import { envConfig } from '~/constants/config'

class BillService {
  async createBill(payload: BillReqBody) {
    const result = await databaseService.bills.create({
      data: {
        ...new Bill({
          ...payload
        })
      }
    })

    return result
  }

  async updateBill(payload: BillReqBody & { id: string }) {
    const result = await databaseService.bills.update({
      where: {
        id: payload.id
      },
      data: {
        ...omit(payload, 'id')
      }
    })

    return result
  }

  async getBills(payload: PaginationQuery) {
    const page = Number(payload.page) || envConfig.page
    const limit = Number(payload.limit) || envConfig.limit
    const { ...query } = omit(payload, ['limit', 'page'])
    const where: any = {}
    if (query) {
      for (const key in query) {
        where[key] = {
          contains: query[key]
        }
      }
    }

    const [total, bills] = await Promise.all([
      databaseService.bills.count({
        where
      }),
      databaseService.bills.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit
      })
    ])

    return {
      page,
      limit,
      bills,
      total_page: Math.ceil(total / limit) || 0,
      total_record: total || 0
    }
  }
}

const billService = new BillService()

export default billService
