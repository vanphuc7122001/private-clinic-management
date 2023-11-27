import { PrescriptionReqBody } from '~/models/requests/Prescription.requests'
import databaseService from './database.service'
import { forEach } from 'lodash'

class PrescriptionService {
  async createPrescription(payload: PrescriptionReqBody & { medicines: any[] }) {
    const newPrescription = await databaseService.prescriptions.create({
      data: {
        medical_record_id: payload.medical_record_id
      }
    })

    const prescriptionDetails = []
    for (const detail of payload.medicines) {
      const prescriptionDetail = await databaseService.prescriptionDetails.create({
        data: {
          dosage: detail.dosage,
          quantity: detail.quantity,
          medicine_id: detail.id,
          prescription_id: newPrescription.id
        }
      })
      prescriptionDetails.push(prescriptionDetail)
    }

    return await databaseService.prescriptions.findFirst({
      where: {
        id: newPrescription.id
      },
      include: {
        prescriptionsDetail: {
          include: {
            medicines: true
          }
        }
      }
    })
  }

  async updatePrescription(payload: PrescriptionReqBody & { medicines: any[]; id: string }) {
    const { medicines, id: prescription_id } = payload
    const newMedicines = medicines || []

    const existingPrescription = await databaseService.prescriptions.findFirst({
      where: {
        id: prescription_id
      },
      include: {
        prescriptionsDetail: true
      }
    })

    const oldMedicines =
      existingPrescription?.prescriptionsDetail.map((medicine) => {
        return {
          id: medicine.medicine_id,
          dosage: medicine.dosage,
          quantity: medicine.quantity
        }
      }) || []

    if (oldMedicines.length > 0) {
      await Promise.all([
        oldMedicines.forEach(async (element: any) => {
          await databaseService.prescriptionDetails.deleteMany({
            where: {
              prescription_id: prescription_id,
              medicine_id: element.id
            }
          })
        })
      ])
    }

    if (newMedicines.length > 0) {
      await Promise.all([
        newMedicines.forEach(async (element: any) => {
          await databaseService.prescriptionDetails.create({
            data: {
              prescription_id: prescription_id,
              medicine_id: element.id,
              dosage: element.dosage,
              quantity: element.quantity
            }
          })
        })
      ])
    }

    return await databaseService.prescriptions.findFirst({
      where: {
        id: prescription_id
      },
      include: {
        prescriptionsDetail: {
          include: {
            medicines: true
          }
        }
      }
    })
  }
}

const prescriptionService = new PrescriptionService()

export default prescriptionService
