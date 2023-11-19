import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enum'

export interface RegisterReqBody {
  name: string
  gender: string
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

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  role: string
  is_patient: boolean
  exp: number
  iat: number
}
