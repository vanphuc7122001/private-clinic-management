import { ObjectId } from '~/utils/commons'

interface RefreshTokenType {
  id?: string
  token: string
  user_id: string
  exp: number
  iat: number
  created_at?: Date
  updated_at?: Date
}

export default class RefreshToken {
  id?: string
  token: string
  user_id: string
  exp: Date
  iat: Date
  created_at?: Date
  updated_at?: Date
  constructor(refreshToken: RefreshTokenType) {
    const date = new Date()
    this.id = refreshToken.id || ObjectId()
    this.token = refreshToken.token
    this.user_id = refreshToken.user_id
    this.exp = new Date(refreshToken.exp * 1000) // Convert Epoch time to Date
    this.iat = new Date(refreshToken.iat * 1000) //Convert Epoch time to Date
    this.created_at = refreshToken.created_at || date
    this.updated_at = refreshToken.updated_at || date
  }
}
