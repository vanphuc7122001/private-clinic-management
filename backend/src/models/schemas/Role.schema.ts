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

  constructor({ id, name, created_at, updated_at }: RoleType) {
    const date = new Date()
    this.id = id
    this.name = name
    this.created_at = created_at || date
    this.updated_at = updated_at || date
  }
}
