import { ChangePasswordReqBody } from './../types/user.type'
import path from '~/constants/path'
import { UserGetMeResponse } from '~/types/user.type'
import http from '~/utils/http'

export const URL_GET_ME = 'me'
export const URL_CHANGE_PASSWORD = 'change-password'

const userApi = {
  getMe() {
    return http.get<UserGetMeResponse>(`${path.user}${URL_GET_ME}`)
  },
  updateMe(body: {
    name: string
    email: string
    phone: string
    address: string
    gender: string
    date_of_birth: string
    avatar?: string
  }) {
    return http.patch<{ message: string }>(`${path.user}${URL_GET_ME}`, body)
  },
  changePassword(body: ChangePasswordReqBody) {
    return http.patch<{ message: string }>(`${path.user}${URL_CHANGE_PASSWORD}`, body)
  }
}

export default userApi
