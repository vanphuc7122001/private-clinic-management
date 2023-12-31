import { JwtPayload } from 'jsonwebtoken'
import { Roles, TokenType } from '~/constants/enum'

export interface RegisterReqBody {
  name: string
  gender: string
  date_of_birth: string
  avatar: string
  address: string
  phone: string
  email?: string
  password?: string
  is_patient: boolean
  role_id: string
}

export interface LoginReqBody {
  email: string
  password: string
}

export interface RefreshTokenReqBody {
  refresh_token: string
}

export interface LogOutReqBody {
  refresh_token: string
}

export interface ChangePassReqBody {
  old_password: string
  new_password: string
  confirm_password: string
}

export interface ForgotPassReqBody {
  email: string
}

export interface ResetPassReq {
  forgot_password_token: string
  password: string
  confirm_password: string
}

export interface UpdateMeReqBody {
  name?: string
  avatar?: string
  date_of_birth?: string
  address?: string
  phone?: string
  gender?: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  role: Roles
  is_patient: boolean
  exp: number
  iat: number
  id: string
}
