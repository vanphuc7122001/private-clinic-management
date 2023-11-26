import { omit } from 'lodash'
import { MedicineReqBody } from '~/models/requests/Medicine.requests'
import databaseService from './database.service'
import Medicine from '~/models/schemas/Medicine.schema'
import { PaginationQuery } from '~/models/requests/Other.requests'
import { envConfig } from '~/constants/config'

class MedicineService {
  async getMedicines(payload: PaginationQuery) {
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

    const [total, medicines] = await Promise.all([
      databaseService.medicines.count({
        where
      }),
      databaseService.medicines.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit
      })
    ])

    return {
      page,
      limit,
      medicines,
      total_page: Math.ceil(total / limit) || 0,
      total_record: total || 0
    }
  }
  async createMedicine(payload: MedicineReqBody) {
    const result = await databaseService.medicines.create({
      data: new Medicine({
        ...payload
      })
    })

    return result
  }

  async updateMedicine(payload: MedicineReqBody & { id: string }) {
    const result = await databaseService.medicines.update({
      where: {
        id: payload.id
      },
      data: {
        ...omit(payload, 'id')
      }
    })

    return result
  }

  async deleteMedicine(id: string) {
    await databaseService.medicines.delete({
      where: {
        id
      }
    })
  }
}

const medicineService = new MedicineService()

export default medicineService
