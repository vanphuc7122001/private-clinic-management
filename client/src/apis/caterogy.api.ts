import path from '~/constants/path'
import { CreateCaterogySuccess, GetCaterogiesSuccess } from '~/types/caterogy.api.type'
import http from '~/utils/http'

const caterogyApi = {
  getCaterogies() {
    return http.get<GetCaterogiesSuccess>(`${path.caterogy}`)
  },
  createCategory(name: string) {
    return http.post<CreateCaterogySuccess>(`${path.caterogy}`, { name })
  }
}

export default caterogyApi
