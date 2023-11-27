import { BillStatus } from '~/constants/enum'

export interface BillReqBody {
  id?: string
  medical_record_id: string
  status?: BillStatus
  amount: string
  created_at?: Date
  updated_at?: Date
}
