import databaseService from './database.service'

class RoleService {
  async getRoles() {
    const roles = await databaseService.roles.findMany()
    return roles
  }
}

const roleService = new RoleService()
export default roleService
