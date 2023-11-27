import { RegisterReqBody } from './../types/auth.type'
import { AuthResponse } from 'src/types/auth.type'
import path from '~/constants/path'
import http from '~/utils/http'

export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'

const authApi = {
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(`${path.user}/${URL_LOGIN}`, body)
  },
  register(body: RegisterReqBody) {
    return http.post<AuthResponse>(`${path.user}/${URL_REGISTER}`, body)
  },
  logout() {
    return http.post(URL_LOGOUT)
  }
}

export default authApi