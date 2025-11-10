import { userRepository } from '../../repositories/auth/user.repository.js'

export const userService = {
  async getAllUsers () {
    return userRepository.findAll()
  },

  async getUserById (id) {
    const user = await userRepository.findById(id)
    if (!user) throw new Error('User not found')
    return user
  },

  async createUser (data) {
    const existing = await userRepository.findByEmail(data.email)
    if (existing) throw new Error('Email already in use')
    return userRepository.create(data)
  },

  async updateUser (id, data) {
    return userRepository.update(id, data)
  },

  async deleteUser (id) {
    return userRepository.delete(id)
  }
}
