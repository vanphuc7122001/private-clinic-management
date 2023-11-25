import { omit } from 'lodash'
import MedicalServiceSchema from '~/models/schemas/MedicalService.schema'
import databaseService from './database.service'

class MedicalService {
  async createMedicalService(payload: { name: string; price: string }) {
    const result = await databaseService.medicalServices.create({
      data: new MedicalServiceSchema({
        ...payload
      })
    })

    return result
  }

  async getMedicalServices(payload: { page: string; limit: string; [key: string]: string }) {
    const page = Number(payload.page) || 1
    const limit = Number(payload.limit) || 3
    const name = payload.name
    let where = {}
    if (name) {
      where = {
        name: {
          contains: name
        }
      }
    }

    const [total, services] = await Promise.all([
      databaseService.medicalServices.count({
        where
      }),
      databaseService.medicalServices.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit
      })
    ])

    return {
      page,
      limit,
      services,
      total_page: Math.ceil(total / limit) || 0,
      total_record: total || 0
    }
  }

  async updateMedicalService(payload: { name: string; price: string; id: string }) {
    const result = await databaseService.medicalServices.update({
      where: {
        id: payload.id
      },
      data: {
        ...omit(payload, 'id')
      }
    })

    return result
  }

  async deleteMedicalService(id: string) {
    await databaseService.medicalServices.delete({
      where: {
        id
      }
    })
  }
}

const medicalService = new MedicalService()
export default medicalService
