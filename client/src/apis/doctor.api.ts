import path from '~/constants/path'
import { GetDoctorResponeSuccess, GetDoctosResonpneSuccess } from '~/types/doctor.type'
import http from '~/utils/http'

const doctorApi = {
  getDoctors(body: { page: string | number; limit: string | number }) {
    return http.get<GetDoctosResonpneSuccess>(`${path.doctor}?page=${body.page}&limit=${body.limit}`)
  },
  getDoctorDetail(id: string | undefined) {
    return http.get<GetDoctorResponeSuccess>(`${path.doctor}/${id}`)
  }
}

export default doctorApi
