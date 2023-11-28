import path from '~/constants/path'
import { CreateAppointmentUserSuccess, GetAppointmentsUserSuccess } from '~/types/appointment.type'
import http from '~/utils/http'

const URL_CREATE_APPOINTMENT_USER = 'users'

const appointmentApi = {
  createAppointmentUser(body: { doctor_id: string; date: string }) {
    return http.post<CreateAppointmentUserSuccess>(`${path.appointment}${URL_CREATE_APPOINTMENT_USER}`, body)
  },

  getAppointmentWithUser(body: { page: string | number; limit: string | number }) {
    return http.get<GetAppointmentsUserSuccess>(`${path.appointment}?page=${body.page}&limit=${body.limit}`)
  }
}

export default appointmentApi
