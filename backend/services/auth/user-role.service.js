import { userRoleRepository } from '../../repositories/auth/user-role.repository.js'

export const userRoleService = {
  async getAllUserRoles () {
    return userRoleRepository.findAll()
  },
  async getUserRoleById (id) {
    const userRole = await userRoleRepository.findById(id)
    if (!userRole) throw new Error('UserRole not found')
    return userRole
  },
  async createUserRole (data) {
    const user = await userRoleRepository.findById(data.user_id)
    if (!user) throw new Error('User not found')
    const role = await userRoleRepository.findById(data.role_id)
    if (!role) throw new Error('Role not found')
    return userRoleRepository.create({ user_id: data.user_id, role_id: data.role_id })
  },

  async updateUserRole (id, data) {
    return userRoleRepository.update(id, data)
  },

  async deleteUserRole (id) {
    return userRoleRepository.delete(id)
  }
}
