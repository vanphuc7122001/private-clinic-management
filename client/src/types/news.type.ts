import { SuccessResponse } from './utils.type'

export interface NewsType {
  id: string
  title: string
  images: string
  description: string
  content: string
  user_id: string
  category_id: string
  status: boolean
  created_at: string
  updated_at: string
}

export type GetNewSuccess = SuccessResponse<NewsType>

export type GetAllNewsResonpneSuccess = SuccessResponse<{
  page: number
  limit: number
  news: NewsType[]
  total_page: number
  total_record: number
}>
