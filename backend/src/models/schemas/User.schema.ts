import { Genders } from '~/constants/enum'
import { ObjectId } from '~/utils/commons'

interface UserType {
  id?: string
  name: string
  date_of_birth: Date
  avatar?: string
  address: string
  phone: string
  email?: string
  password?: string
  gender?: string
  is_patient?: boolean
  forgot_password_token?: string
  role_id: string
  created_at?: Date
  updated_at?: Date
}

export default class User {
  id?: string
  name: string
  avatar?: string
  date_of_birth: Date
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
    this.date_of_birth = user.date_of_birth
    this.address = user.address
    this.phone = user.phone
    this.email = user.email
    this.password = user.password
    this.gender = user.gender || Genders.Other
    this.is_patient = user.is_patient || false
    this.forgot_password_token = user.forgot_password_token || ''
    this.role_id = user.role_id
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
  }
}
