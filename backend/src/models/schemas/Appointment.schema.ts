import { AppoitmentStatus } from '~/constants/enum'
import { ObjectId } from '~/utils/commons'

interface AppointmentType {
  id?: string
  date: string
  doctor_id: string
  patient_id: string
  status?: AppoitmentStatus
  created_at?: Date
  updated_at?: Date
}

export default class Appointment {
  id?: string
  date: Date
  doctor_id: string
  patient_id: string
  status: AppoitmentStatus
  created_at?: Date
  updated_at?: Date

  constructor(appointment: AppointmentType) {
    const date = new Date()
    this.id = appointment.id || ObjectId()
    this.date = new Date(appointment.date)
    this.doctor_id = appointment.doctor_id
    this.patient_id = appointment.patient_id
    this.status = appointment.status || AppoitmentStatus.UNCONFIRM
    this.created_at = appointment.created_at || date
    this.updated_at = appointment.updated_at || date
  }
}
