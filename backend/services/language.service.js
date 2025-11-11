import { languageRepository } from '../repositories/language.repository.js'

export const languageService = {
  async getAllLanguages () {
    return languageRepository.findAll()
  },

  async getLanguageById (id) {
    const language = await languageRepository.findById(id)
    if (!language) throw new Error('Language not found')
    return language
  },

  async createLanguage (data) {
    const existing = await languageRepository.findByName(data.name)
    if (existing) throw new Error('Language name already in use')
    return languageRepository.create(data)
  },

  async updateLanguage (id, data) {
    return languageRepository.update(id, data)
  },

  async deleteLanguage (id) {
    return languageRepository.delete(id)
  }
}
