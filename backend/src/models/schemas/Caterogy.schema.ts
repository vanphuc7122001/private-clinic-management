import { ObjectId } from '~/utils/commons'

interface CaterogyType {
  id?: string
  name: string
  created_at?: Date
  updated_at?: Date
}

export default class Caterogy {
  id?: string
  name: string
  created_at?: Date
  updated_at?: Date

  constructor(caterogy: CaterogyType) {
    const date = new Date()
    this.id = caterogy.id || ObjectId()
    this.name = caterogy.name
    this.created_at = caterogy.created_at || date
    this.updated_at = caterogy.updated_at || date
  }
}
