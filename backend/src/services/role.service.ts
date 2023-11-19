import Role from '~/models/schemas/Role.schema'
import databaseService from './database.service'

class RoleService {
  async getRoles() {
    const roles = await databaseService.roles.findMany({
      select: {
        name: true,
        id: true
      }
    })
    return roles
  }

  async createRole(name: string) {
    const newRole = await databaseService.roles.create({
      data: new Role({ name }),
      select: {
        name: true
      }
    })

    return newRole
  }
}

const roleService = new RoleService()
export default roleService
