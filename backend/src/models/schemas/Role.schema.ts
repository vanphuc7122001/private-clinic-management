import { ObjectId } from '~/utils/commons'

interface RoleType {
  id?: string
  name: string
  created_at?: Date
  updated_at?: Date
}

export default class Role {
  id?: string
  name: string
  created_at?: Date
  updated_at?: Date

  constructor(role: RoleType) {
    const date = new Date()
    this.id = role.id || ObjectId()
    this.name = role.name
    this.created_at = role.created_at || date
    this.updated_at = role.updated_at || date
  }
}
