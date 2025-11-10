import { roleRepository } from '../../repositories/auth/role.repository.js'

export const roleService = {
  async getAllRoles () {
    return roleRepository.findAll()
  },

  async getRoleById (id) {
    const role = await roleRepository.findById(id)
    if (!role) throw new Error('Role not found')
    return role
  },

  async createRole (data) {
    const existing = await roleRepository.findById(data.id)
    if (existing) throw new Error('Role already exists')
    return roleRepository.create(data)
  },

  async updateRole (id, data) {
    return roleRepository.update(id, data)
  },

  async deleteRole (id) {
    return roleRepository.delete(id)
  }
}
