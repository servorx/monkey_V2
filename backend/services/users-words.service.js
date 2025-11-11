import { usersWordsRepository } from '../repositories/users-words.repository'

export const usersWordsService = {
  async getAllUsersWords () {
    return usersWordsRepository.findAll()
  },

  async getUsersWordsById (id) {
    const usersWords = await usersWordsRepository.findById(id)
    if (!usersWords) throw new Error('Users words not found')
    return usersWords
  },

  async createUsersWords (data) {
    const existing = await usersWordsRepository.findByUserId(data.user_id)
    if (existing) throw new Error('Users words already in use')
    return usersWordsRepository.create(data)
  },

  async updateUsersWords (id, data) {
    return usersWordsRepository.update(id, data)
  },

  async deleteUsersWords (id) {
    return usersWordsRepository.delete(id)
  }
}
