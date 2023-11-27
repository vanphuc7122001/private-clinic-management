interface DoctorType {
  doctor_id: string
  certification: string
  expricence: string
  education: string
  created_at?: Date
  updated_at?: Date
}

export default class Doctor {
  doctor_id: string
  certification: string
  expricence: string
  education: string
  created_at?: Date
  updated_at?: Date

  constructor(doctor: DoctorType) {
    const date = new Date()
    this.doctor_id = doctor.doctor_id
    this.certification = doctor.certification
    this.expricence = doctor.expricence
    this.education = doctor.education
    this.created_at = doctor.created_at || date
    this.updated_at = doctor.updated_at || date
  }
}
