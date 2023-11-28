import { UserTypeGlobal } from './global.type'
import { SuccessResponse } from './utils.type'

interface DoctorType {
  doctor_id: string
  certification: string
  expricence: string
  education: string
  created_at: string
  updated_at: string
  doctor: UserTypeGlobal
}

export type GetDoctosResonpneSuccess = SuccessResponse<{
  page: number
  limit: number
  doctors: DoctorType[]
  total_page: number
  total_record: number
}>

export type GetDoctorResponeSuccess = SuccessResponse<{
  certification: string
  expricence: string
  education: string
  doctor: UserTypeGlobal & { id: string }
}>
