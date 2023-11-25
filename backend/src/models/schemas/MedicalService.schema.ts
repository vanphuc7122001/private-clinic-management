import { ObjectId } from '~/utils/commons'

interface MedicalServiceType {
  id?: string
  name: string
  price: string
  created_at?: Date
  updated_at?: Date
}

export default class MedicalServiceSchema {
  id?: string
  name: string
  price: string
  created_at?: Date
  updated_at?: Date
  constructor(medicalService: MedicalServiceType) {
    const date = new Date()
    this.id = ObjectId()
    this.name = medicalService.name
    this.price = medicalService.price
    this.created_at = date
    this.updated_at = date
  }
}
