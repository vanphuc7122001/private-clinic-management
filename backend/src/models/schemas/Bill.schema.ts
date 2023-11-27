import { BillStatus } from '~/constants/enum'
import { ObjectId } from '~/utils/commons'

interface BillType {
  id?: string
  medical_record_id: string
  status?: BillStatus
  amount: string
  created_at?: Date
  updated_at?: Date
}

export default class Bill {
  id?: string
  medical_record_id: string
  status: BillStatus
  amount: string
  created_at?: Date
  updated_at?: Date

  constructor(bill: BillType) {
    const date = new Date()
    this.id = bill.id || ObjectId()
    this.medical_record_id = bill.medical_record_id
    this.amount = bill.amount
    this.status = bill.status || BillStatus.UNPAID
    this.created_at = bill.created_at || date
    this.updated_at = bill.updated_at || date
  }
}
