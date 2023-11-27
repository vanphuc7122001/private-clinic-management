import { SuccessResponse } from './utils.type'

export type AuthResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
}>

export interface RegisterReqBody {
  email: string
  password: string
  address: string
  confirm_password: string
  name: string
  phone: string
  date_of_birth: string
  gender: string
  role_id: string
}
