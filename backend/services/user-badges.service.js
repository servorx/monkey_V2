import { userBadgeRepository } from '../repositories/userBadge.repository.js'
import {
  NotFoundError,
  ConflictError,
  ValidationError,
  IntegrityError,
  DatabaseError
} from '../utils/errors.js'

export const userBadgeService = {
  async getAll () {
    try {
      return await userBadgeRepository.findAll()
    } catch (err) {
      throw new DatabaseError('Failed to fetch user badges', err.message)
    }
  },

  async getByUserId (userId) {
    if (!userId) throw new ValidationError('User ID is required')
    const badges = await userBadgeRepository.findByUserId(userId)
    if (!badges || badges.length === 0) throw new NotFoundError('User badges not found')
    return badges
  },

  async create (userId, badgeId) {
    if (!userId || !badgeId) {
      throw new ValidationError('User ID and Badge ID are required')
    }

    const existing = await userBadgeRepository.findByCompositeKey(userId, badgeId)
    if (existing) throw new ConflictError('User already has this badge')

    try {
      return await userBadgeRepository.create({ user_id: userId, badge_id: badgeId })
    } catch (err) {
      if (err.code === 'P2003') throw new IntegrityError('Invalid user or badge reference')
      throw new DatabaseError('Failed to assign badge', err.message)
    }
  },

  async remove (userId, badgeId) {
    const existing = await userBadgeRepository.findByCompositeKey(userId, badgeId)
    if (!existing) throw new NotFoundError('Badge not assigned to user')

    try {
      await userBadgeRepository.delete(userId, badgeId)
    } catch (err) {
      throw new DatabaseError('Failed to remove user badge', err.message)
    }
  },

  async update (userId, badgeId, data) {
    const existing = await userBadgeRepository.findByCompositeKey(userId, badgeId)
    if (!existing) throw new NotFoundError('Badge not assigned to user')

    try {
      return await userBadgeRepository.update(userId, badgeId, data)
    } catch (err) {
      throw new DatabaseError('Failed to update user badge', err.message)
    }
  }
}
