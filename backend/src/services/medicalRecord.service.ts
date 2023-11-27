import { omit } from 'lodash'
import { MedicalRecordReqBody } from '~/models/requests/MedicalRecord.requests'
import databaseService from './database.service'
import MedicalRecord from '~/models/schemas/MedicalRecord.schema'
import { PaginationQuery } from '~/models/requests/Other.requests'
import { envConfig } from '~/constants/config'

class MedicalRecordService {
  async createMedicalRecord(payload: MedicalRecordReqBody & { services: any[] }) {
    const _payload = omit(payload, 'services')
    const services = payload.services

    const newMedicalRecord = await databaseService.medicalRecords.create({
      data: {
        ...new MedicalRecord({
          ..._payload
        })
      }
    })

    await Promise.all([
      services.forEach(async (id: string) => {
        await databaseService.medicalRecordServices.create({
          data: {
            service_id: id,
            medical_record_id: newMedicalRecord.id
          }
        })
      })
    ])

    const medicalRecord = await databaseService.medicalRecords.findUnique({
      where: {
        id: newMedicalRecord.id
      },
      include: {
        services: true
      }
    })

    return medicalRecord
  }

  async updateMedicalRecord(payload: MedicalRecordReqBody & { id: string; services: any[] }) {
    const newServices = payload.services
    const existingMedicalRecord = await databaseService.medicalRecords.update({
      where: {
        id: payload.id
      },
      data: {
        diagnosis: payload.diagnosis,
        note: payload.note
      },
      include: {
        services: true
      }
    })

    const oldServices = existingMedicalRecord?.services.map((service) => service.service_id)
    const isOldServices = oldServices ? oldServices : []

    const servicesToRemove = isOldServices.filter((serviceId) => !newServices.includes(serviceId))
    const servicesToAdd = isOldServices.filter((serviceId) => newServices.includes(serviceId))

    if (servicesToRemove.length > 0) {
      await databaseService.medicalRecordServices.deleteMany({
        where: {
          AND: [
            {
              medical_record_id: payload.id,
              service_id: { in: servicesToRemove }
            }
          ]
        }
      })
    }
    if (servicesToAdd.length > 0) {
      await Promise.all([
        servicesToAdd.forEach(async (id: string) => {
          await databaseService.medicalRecordServices.create({
            data: {
              service_id: id,
              medical_record_id: payload.id
            }
          })
        })
      ])
    }

    const result = await databaseService.medicalRecords.findFirst({
      where: {
        id: payload.id
      },
      include: {
        services: {
          include: {
            service: true
          }
        }
      }
    })

    return result
  }

  async getMedicalRecords(payload: PaginationQuery) {
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

    const [total, medicalRecords] = await Promise.all([
      databaseService.medicalRecords.count({
        where
      }),
      databaseService.medicalRecords.findMany({
        where,
        include: {
          services: true
        },
        skip: (page - 1) * limit,
        take: limit
      })
    ])

    return {
      page,
      limit,
      medicalRecords,
      total_page: Math.ceil(total / limit) || 0,
      total_record: total || 0
    }
  }

  async getMedicalRecord(id: string) {
    const result = await databaseService.medicalRecords.findMany({
      include: {
        services: {
          include: {
            service: true
          }
        }
      }
    })

    return result
  }
}

const medicalRecordService = new MedicalRecordService()

export default medicalRecordService
