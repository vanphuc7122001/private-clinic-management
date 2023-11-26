import { ObjectId } from '~/utils/commons'

interface MedicineType {
  id?: string
  name: string
  manufacturer: string
  usage: string
  quantity: string
  price: string
  purchase_price: string
  created_at?: Date
  updated_at?: Date
}

export default class Medicine {
  id?: string
  name: string
  manufacturer: string
  usage: string
  quantity: string
  price: string
  purchase_price: string
  created_at?: Date
  updated_at?: Date

  constructor(medicine: MedicineType) {
    const date = new Date()
    this.id = medicine.id || ObjectId()
    this.name = medicine.name
    this.manufacturer = medicine.manufacturer
    this.usage = medicine.usage
    this.quantity = medicine.quantity
    ;(this.price = medicine.price), (this.purchase_price = medicine.purchase_price)
    this.created_at = medicine.created_at || date
    this.updated_at = medicine.updated_at || date
  }
}
