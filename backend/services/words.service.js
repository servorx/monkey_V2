import { wordsRepository } from '../repositories/words.repository'

export const wordsService = {
  async getAllWords () {
    const words = await wordsRepository.findAll()
    return words
  },

  async getWordById (id) {
    const word = await wordsRepository.findById(id)
    if (!word) throw new Error('Word not found')
    return word
  },

  async createWord (data) {
    const word = await wordsRepository.create(data)
    return word
  },

  async updateWord (id, data) {
    return wordsRepository.update(id, data)
  },

  async deleteWord (id) {
    return wordsRepository.delete(id)
  }
}
