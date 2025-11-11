import { wordRepository } from '../repositories/word.repository.js'
import { NotFoundError, ConflictError } from '../utils/errors.js'

export const wordService = {
  async getAll () {
    return wordRepository.findAll()
  },

  async getById (id) {
    const word = await wordRepository.findById(id)
    if (!word) throw new NotFoundError('Word not found')
    return word
  },

  async getByName (name) {
    const word = await wordRepository.findByWord(name)
    if (!word) throw new NotFoundError('Word not found')
    return word
  },

  async create (data) {
    const existing = await wordRepository.findByWord(data.word)
    if (existing) throw new ConflictError('Word already exists')
    return wordRepository.create(data)
  },

  async update (id, data) {
    const existing = await wordRepository.findById(id)
    if (!existing) throw new NotFoundError('Word not found')
    return wordRepository.update(id, data)
  },

  async remove (id) {
    const existing = await wordRepository.findById(id)
    if (!existing) throw new NotFoundError('Word not found')
    await wordRepository.delete(id)
  }
}
