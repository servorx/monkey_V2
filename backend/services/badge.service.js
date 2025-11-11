import { badgeRepository } from '../repositories/badge.repository.js'

export const badgeService = {
  async getAllBadges () {
    return badgeRepository.findAll()
  },

  async getBadgeById (id) {
    const badge = await badgeRepository.findById(id)
    if (!badge) throw new Error('Badge not found')
    return badge
  },

  async createBadge (data) {
    const existing = await badgeRepository.findByName(data.name)
    if (existing) throw new Error('Badge name already in use')
    return badgeRepository.create(data)
  },

  async updateBadge (id, data) {
    const existing = await badgeRepository.findByName(data.name)
    if (existing) throw new Error('Badge name already in use')
    return badgeRepository.update(id, data)
  },

  async deleteBadge (id) {
    return badgeRepository.delete(id)
  }
}
