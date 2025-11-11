import { languageWordRepository } from '../repositories/language-word.repository.js'

export const languageWordService = {
  async getAllLanguageWords () {
    return languageWordRepository.findAll()
  },

  async getLanguageWordById (id) {
    const languageWord = await languageWordRepository.findById(id)
    if (!languageWord) throw new Error('Language word not found')
    return languageWord
  },

  async createLanguageWord (data) {
    const existing = await languageWordRepository.findByWordId(data.word_id)
    if (existing) throw new Error('Language word already in use')
    return languageWordRepository.create(data)
  },

  async updateLanguageWord (id, data) {
    return languageWordRepository.update(id, data)
  },

  async deleteLanguageWord (id) {
    return languageWordRepository.delete(id)
  }
}
