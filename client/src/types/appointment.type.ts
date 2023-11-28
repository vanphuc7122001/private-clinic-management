import { UserTypeGlobal } from './global.type'
import { SuccessResponse } from './utils.type'

export type CreateAppointmentUserSuccess = SuccessResponse<{
  id: string
  date: string
  doctor_id: string
  patient_id: string
  status: string
  updated_at: string
  created_at: string
}>

export type GetAppointmentsUserSuccess = SuccessResponse<{
  page: number
  limit: number
  total_page: number
  appointments: [
    {
      id: string
      date: string
      doctor_id: string
      patient_id: string
      status: string
      updated_at: string
      created_at: string
      doctor: UserTypeGlobal
      patient: UserTypeGlobal
    }
  ]
  total_record: number
}>
