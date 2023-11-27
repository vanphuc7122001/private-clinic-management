import { ObjectId } from '~/utils/commons'

interface MedicalRecordType {
  id?: string
  diagnosis: string
  note: string
  appointment_id: string
  created_at?: Date
  updated_at?: Date
}

export default class MedicalRecord {
  id?: string
  diagnosis: string
  note: string
  appointment_id: string
  created_at?: Date
  updated_at?: Date

  constructor(medicalRecord: MedicalRecordType) {
    const date = new Date()
    this.id = medicalRecord.id || ObjectId()
    this.appointment_id = medicalRecord.appointment_id
    this.diagnosis = medicalRecord.diagnosis || ''
    this.note = medicalRecord.note || ''
    this.created_at = medicalRecord.created_at || date
    this.updated_at = medicalRecord.updated_at || date
  }
}
