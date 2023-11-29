import path from '~/constants/path'
import { CreateCaterogySuccess, GetCaterogiesSuccess } from '~/types/caterogy.api.type'
import http from '~/utils/http'

const caterogyApi = {
  getCaterogies() {
    return http.get<GetCaterogiesSuccess>(`${path.caterogy}`)
  },
  createCategory(name: string) {
    return http.post<CreateCaterogySuccess>(`${path.caterogy}`, { name })
  },
  updateCategory({ name, id }: { name: string; id: string }) {
    return http.put<CreateCaterogySuccess>(`${path.caterogy}${id}`, { name })
  },
  deleteCaterogy(id: string) {
    return http.delete<{ message: string }>(`${path.caterogy}/${id}`)
  },
  getCaterogy(id: string) {
    return http.get<CreateCaterogySuccess>(`${path.caterogy}/${id}`)
  }
}

export default caterogyApi
