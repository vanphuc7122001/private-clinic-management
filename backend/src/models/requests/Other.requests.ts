import { ParamsDictionary } from 'express-serve-static-core'

export interface PaginationQuery {
  page: string
  limit: string
  [key: string]: string
}

export interface IdParams extends ParamsDictionary {
  id: string
}
