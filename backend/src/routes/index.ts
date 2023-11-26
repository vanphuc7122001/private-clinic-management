import { Express } from 'express'
import roleRouters from './role.routes'
import userRouters from './user.routes'
import mediaRouters from './media.routes'
import categoryRouters from './caterogy.routes'
import newsRouters from './news.routes'
import doctorRouters from './doctor.routes'
import medicaRecordRouters from './medicalRecord.routes'
import appointmentRouters from './appointment.routes'
import staffScheduleRouters from './staffSchedule.routes'
import prescriptionRouters from './prescription.routes'
import medicalServiceRouters from './medicalService.routes'
import medicineRouters from './medicine.routes'

export const initRoutes = (baseUrl: string, app: Express) => {
  app.use(`${baseUrl}/roles`, roleRouters)
  app.use(`${baseUrl}/medical-services`, medicalServiceRouters)
  app.use(`${baseUrl}/users`, userRouters)
  app.use(`${baseUrl}/medias`, mediaRouters)
  app.use(`${baseUrl}/caterogies`, categoryRouters)
  app.use(`${baseUrl}/medicines`, medicineRouters)
  app.use(`${baseUrl}/news`, newsRouters)
  app.use(`${baseUrl}/doctors`, doctorRouters)
  app.use(`${baseUrl}/medical-records`, medicaRecordRouters)
  app.use(`${baseUrl}/staff-schedules`, staffScheduleRouters)
  app.use(`${baseUrl}/appointments`, appointmentRouters)
  app.use(`${baseUrl}/prescriptions`, prescriptionRouters)
}

// https://private-clinnic-medical.s3.ap-southeast-1.amazonaws.com/images/hero-img1.jpg
