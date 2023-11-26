import { ObjectId } from '~/utils/commons'

interface StaffScheduleType {
  id?: string
  date: string
  staff_id: string
  shift: string
  note?: string
  created_at?: Date
  updated_at?: Date
}

export default class StaffSchedule {
  id?: string
  date: Date
  staff_id: string
  shift: string
  note?: string
  created_at?: Date
  updated_at?: Date

  constructor(staffSchedule: StaffScheduleType) {
    const date = new Date()
    this.id = staffSchedule.id || ObjectId()
    this.staff_id = staffSchedule.staff_id
    this.shift = staffSchedule.shift
    this.note = staffSchedule.note || ''
    this.date = new Date(staffSchedule.date)
    this.created_at = staffSchedule.created_at || date
    this.updated_at = staffSchedule.updated_at || date
  }
}
