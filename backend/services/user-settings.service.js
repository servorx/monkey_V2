import { userSettingsRepository } from '../repositories/user-settings.repository'

export const userSettingsService = {
  async getAllUserSettings () {
    return userSettingsRepository.findAll()
  },

  async getUserSettingsById (id) {
    const userSettings = await userSettingsRepository.findById(id)
    if (!userSettings) throw new Error('User settings not found')
    return userSettings
  },

  async createUserSettings (data) {
    const existing = await userSettingsRepository.findByUserId(data.user_id)
    if (existing) throw new Error('User settings already in use')
    return userSettingsRepository.create(data)
  },

  async updateUserSettings (id, data) {
    return userSettingsRepository.update(id, data)
  },

  async deleteUserSettings (id) {
    return userSettingsRepository.delete(id)
  }
}
