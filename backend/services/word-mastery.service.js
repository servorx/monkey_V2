import { wordMasteryRepository } from '../repositories/word-mastery.repository'

export const wordMasteryService = {
  async getAllWordMastery () {
    return wordMasteryRepository.findAll()
  },

  async getWordMasteryById (id) {
    const wordMastery = await wordMasteryRepository.findById(id)
    if (!wordMastery) throw new Error('Word mastery not found')
    return wordMastery
  },

  async createWordMastery (data) {
    const existing = await wordMasteryRepository.findByUserId(data.user_id)
    if (existing) throw new Error('Word mastery already in use')
    return wordMasteryRepository.create(data)
  },

  async updateWordMastery (id, data) {
    return wordMasteryRepository.update(id, data)
  },

  async deleteWordMastery (id) {
    return wordMasteryRepository.delete(id)
  }
}
