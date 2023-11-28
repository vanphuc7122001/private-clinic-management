import { UserTypeGlobal } from './global.type'
import { SuccessResponse } from './utils.type'

export type UserGetMeResponse = SuccessResponse<UserTypeGlobal>

export interface ChangePasswordReqBody {
  old_password: string
  new_password: string
  confirm_password: string
}
