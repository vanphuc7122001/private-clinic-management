import axios, { AxiosError } from 'axios'
import HttpStatusCode from '~/constants/httpStatusCodeEnum'
import { ErrorResponse } from '~/types/utils.type'

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  return axios.isAxiosError(error)
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ message: string }>>(error) &&
    error.response?.data.message === 'Jwt expired'
  )
}

export const isActiveLink =
  ({ active, notActive }: { active: string; notActive: string }) =>
  ({ isActive }: { isActive: any }) => {
    return isActive ? active : notActive
  }
