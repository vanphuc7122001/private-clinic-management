import path from '~/constants/path'
import { GetAllNewsResonpneSuccess, GetNewSuccess } from '~/types/news.type'
import http from '~/utils/http'

const newsApi = {
  getNews(body: { page: string | number; limit: string | number }) {
    return http.get<GetAllNewsResonpneSuccess>(`${path.new}?page=${body.page}&limit=${body.limit}`)
  },
  getNewDetail(id: string | undefined) {
    return http.get<GetNewSuccess>(`${path.new}/${id}`)
  }
}

export default newsApi
