import { omit } from 'lodash'
import { StaffScheduleReqBody } from '~/models/requests/StaffSchedule.requests'
import databaseService from './database.service'
import StaffSchedule from '~/models/schemas/StaffSchedule.schema'
import { PaginationQuery } from '~/models/requests/Other.requests'
import { envConfig } from '~/constants/config'

class StaffScheduleService {
  async createStaffSchedule(payload: StaffScheduleReqBody) {
    const result = await databaseService.staffSchedules.create({
      data: new StaffSchedule({
        ...payload
      })
    })

    return result
  }

  async updateStaffSchedule(payload: StaffScheduleReqBody & { id: string }) {
    const result = await databaseService.staffSchedules.update({
      where: {
        id: payload.id
      },
      data: {
        ...omit(payload, 'id'),
        date: new Date(payload.date)
      }
    })

    return result
  }

  async getStaffSchedules(payload: PaginationQuery) {
    const page = Number(payload.page) || envConfig.page
    const limit = Number(payload.limit) || envConfig.limit
    const { ...query } = omit(payload, ['limit', 'page'])
    const where: any = {}
    if (query) {
      for (const key in query) {
        const operator =
          key === 'date'
            ? { equals: new Date(query[key]) }
            : {
                contains: query[key]
              }
        where[key] = operator
      }
    }

    const [total, staffSchedules] = await Promise.all([
      databaseService.staffSchedules.count({
        where
      }),
      databaseService.staffSchedules.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit
      })
    ])

    return {
      page,
      limit,
      staffSchedules,
      total_page: Math.ceil(total / limit) || 0,
      total_record: total || 0
    }
  }
}

const staffScheduleService = new StaffScheduleService()

export default staffScheduleService
