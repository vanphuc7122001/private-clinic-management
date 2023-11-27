import { AppoitmentStatus } from '~/constants/enum'

export interface AppointmentReqBody {
  date: string
  doctor_id: string
  patient_id: string
  status?: AppoitmentStatus
}
