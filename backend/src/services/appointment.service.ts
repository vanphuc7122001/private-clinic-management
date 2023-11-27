import { AppointmentReqBody } from '~/models/requests/Appointment.requests'
import databaseService from './database.service'
import Appointment from '~/models/schemas/Appointment.schema'
import { PaginationQuery } from '~/models/requests/Other.requests'
import { envConfig } from '~/constants/config'
import { omit } from 'lodash'
import { AppoitmentStatus } from '~/constants/enum'

class AppointmentService {
  async createAppointment(payload: AppointmentReqBody) {
    const result = await databaseService.appointments.create({
      data: new Appointment({
        ...payload
      })
    })

    return result
  }

  async getAppointment(id: string) {
    const result = await databaseService.appointments.findFirst({
      where: {
        id
      },
      include: {
        doctor: true,
        patient: true
      }
    })

    return result
  }

  async getAppointments(payload: PaginationQuery) {
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
      databaseService.appointments.count({
        where
      }),
      databaseService.appointments.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          doctor: true,
          patient: true
        }
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

  async updateAppointment(payload: AppointmentReqBody & { id: string }) {
    const result = await databaseService.appointments.update({
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

  async deleteAppointment(id: string) {
    await databaseService.appointments.delete({
      where: {
        id
      }
    })
  }
}

const appointmentService = new AppointmentService()
export default appointmentService
