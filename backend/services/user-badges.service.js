import { userBadgeRepository } from '../repositories/user-badges.repository'

export const userBadgeService = {
  async getAllUserBadges () {
    return userBadgeRepository.findAll()
  },

  async getUserBadgeById (id) {
    const userBadge = await userBadgeRepository.findById(id)
    if (!userBadge) throw new Error('User badge not found')
    return userBadge
  },

  async createUserBadge (data) {
    const existing = await userBadgeRepository.findByUserId(data.user_id)
    if (existing) throw new Error('User badge already in use')
    return userBadgeRepository.create(data)
  },

  async updateUserBadge (id, data) {
    return userBadgeRepository.update(id, data)
  },

  async deleteUserBadge (id) {
    return userBadgeRepository.delete(id)
  }
}
