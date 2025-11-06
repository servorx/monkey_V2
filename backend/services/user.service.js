import { userRepository } from '../repositories/user.repository'
import bcrypt from 'bcrypt'

export const userService = {
  async registerUser (userData) {
    const existing = await userRepository.findByEmail(userData.email)
    if (existing) throw new Error('Email already in use')

    const hashed = await bcrypt.hash(userData.password, 10)
    const user = await userRepository.create({ ...userData, password: hashed })
    return user
  },

  async getUserProfile (id) {
    const user = await userRepository.findById(id)
    if (!user) throw new Error('User not found')
    return user
  },

  async updateProfile (id, data) {
    return userRepository.update(id, data)
  }
}
