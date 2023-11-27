import { omit } from 'lodash'
import { DoctorReqBody } from '~/models/requests/Doctor.requests'
import databaseService from './database.service'
import Doctor from '~/models/schemas/Doctor.schema'
import { PaginationQuery } from '~/models/requests/Other.requests'
import { envConfig } from '~/constants/config'

class DoctorService {
  async createDoctor(payload: DoctorReqBody) {
    const result = await databaseService.doctorProfiles.create({
      data: new Doctor({
        ...payload
      })
    })

    return result
  }

  async updateDoctor(payload: DoctorReqBody & { id: string }) {
    const result = await databaseService.doctorProfiles.update({
      where: {
        doctor_id: payload.id
      },
      data: {
        ...omit(payload, 'id')
      }
    })

    return result
  }

  async getDoctor(id: string) {
    const result = await databaseService.doctorProfiles.findFirst({
      where: {
        doctor_id: id
      },
      select: {
        certification: true,
        education: true,
        expricence: true,
        doctor: true
      }
    })

    return result
  }

  async getDoctors(payload: PaginationQuery) {
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

    const [total, doctors] = await Promise.all([
      databaseService.doctorProfiles.count({
        where
      }),
      databaseService.doctorProfiles.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          doctor: true
        }
      })
    ])

    return {
      page,
      limit,
      doctors,
      total_page: Math.ceil(total / limit) || 0,
      total_record: total || 0
    }
  }
}

const doctorService = new DoctorService()
export default doctorService
