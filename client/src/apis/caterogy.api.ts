import { pathApi } from '~/constants/path'
import { CreateCaterogySuccess, GetCaterogiesSuccess } from '~/types/caterogy.api.type'
import http from '~/utils/http'

const caterogyApi = {
  getCaterogies() {
    return http.get<GetCaterogiesSuccess>(`${pathApi.caterogy}`)
  },
  createCategory(name: string) {
    return http.post<CreateCaterogySuccess>(`${pathApi.caterogy}`, { name })
  },
  updateCategory({ name, id }: { name: string; id: string }) {
    return http.put<CreateCaterogySuccess>(`${pathApi.caterogy}${id}`, { name })
  },
  deleteCaterogy(id: string) {
    return http.delete<{ message: string }>(`${pathApi.caterogy}/${id}`)
  },
  getCaterogy(id: string) {
    return http.get<CreateCaterogySuccess>(`${pathApi.caterogy}/${id}`)
  }
}

export default caterogyApi
