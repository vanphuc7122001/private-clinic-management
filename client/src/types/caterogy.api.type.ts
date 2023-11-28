import { SuccessResponse } from '~/types/utils.type'

interface Caterogies {
  name: string
  id: string
}

export type GetCaterogiesSuccess = SuccessResponse<Caterogies[]>

export type CreateCaterogySuccess = SuccessResponse<Caterogies>
