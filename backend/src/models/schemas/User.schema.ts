import { ObjectId } from '~/utils/commons'

interface UserType {
  id?: string
  name: string
  avatar?: string
  address: string
  phone: string
  email?: string
  password?: string
  gender: string
  is_patient: boolean
  forgot_password_token?: string
  role_id: string
  created_at?: Date
  updated_at?: Date
}

export default class User {
  id?: string
  name: string
  avatar?: string
  address: string
  phone: string
  email?: string
  password?: string
  gender: string
  is_patient: boolean
  forgot_password_token: string
  role_id: string
  created_at?: Date
  updated_at?: Date

  constructor(user: UserType) {
    const date = new Date()
    this.id = user.id || ObjectId()
    this.name = user.name
    this.avatar = user.avatar
    this.address = user.address
    this.phone = user.phone
    this.email = user.email
    this.password = user.password
    this.gender = user.gender
    this.is_patient = user.is_patient || true
    this.forgot_password_token = user.forgot_password_token || ''
    this.role_id = user.role_id
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
  }
}