import { userSettingRepository } from '../repositories/user-setting.repository.js'
import {
  NotFoundError,
  ValidationError,
  DatabaseError,
  ConflictError,
  IntegrityError
} from '../utils/errors.js'

export const userSettingService = {
  async getByUserId (userId) {
    if (!userId) throw new ValidationError('User ID is required')

    const settings = await userSettingRepository.findByUserId(userId)
    if (!settings) throw new NotFoundError('User settings not found')

    return settings
  },

  async create (data) {
    if (!data.user_id) throw new ValidationError('User ID is required')

    const existing = await userSettingRepository.findByUserId(data.user_id)
    if (existing) throw new ConflictError('User settings already exist')

    try {
      return await userSettingRepository.create(data)
    } catch (err) {
      if (err.code === 'P2003') throw new IntegrityError('Invalid user reference')
      throw new DatabaseError('Failed to create user settings', err.message)
    }
  },

  async update (userId, data) {
    const existing = await userSettingRepository.findByUserId(userId)
    if (!existing) throw new NotFoundError('User settings not found')

    try {
      return await userSettingRepository.update(userId, data)
    } catch (err) {
      throw new DatabaseError('Failed to update user settings', err.message)
    }
  },

  async remove (userId) {
    const existing = await userSettingRepository.findByUserId(userId)
    if (!existing) throw new NotFoundError('User settings not found')

    try {
      await userSettingRepository.delete(userId)
    } catch (err) {
      throw new DatabaseError('Failed to delete user settings', err.message)
    }
  }
}
