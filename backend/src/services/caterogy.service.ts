import { omit } from 'lodash'
import Caterogy from '~/models/schemas/Caterogy.schema'
import databaseService from './database.service'

class CaterogyService {
  async createCaterory(payload: { name: string }) {
    const result = await databaseService.caterogies.create({
      data: new Caterogy({ ...payload })
    })

    return result
  }

  async getCaterogies() {
    const result = await databaseService.caterogies.findMany()
    return result
  }

  async updateCaterogy(payload: { name: string; id: string }) {
    const result = await databaseService.caterogies.update({
      where: {
        id: payload.id
      },
      data: {
        ...omit(payload, 'id')
      }
    })

    return result
  }

  async deleteCaterogy(id: string) {
    await databaseService.caterogies.delete({
      where: {
        id
      }
    })
  }
}

const caterogyService = new CaterogyService()

export default caterogyService
