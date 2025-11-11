import { wordRepository } from '../repositories/word.repository.js'
import {
  NotFoundError,
  ConflictError,
  ValidationError,
  IntegrityError,
  DatabaseError
} from '../utils/errors.js'

export const wordService = {
  async getAll () {
    try {
      return await wordRepository.findAll()
    } catch (err) {
      throw new DatabaseError('Failed to fetch words', err.message)
    }
  },

  async getById (id) {
    const word = await wordRepository.findById(id)
    if (!word) throw new NotFoundError('Word not found')
    return word
  },

  async getByName (name) {
    if (!name || name.trim() === '') {
      throw new ValidationError('Word name cannot be empty')
    }
    const word = await wordRepository.findByWord(name)
    if (!word) throw new NotFoundError('Word not found')
    return word
  },

  async create (data) {
    const existing = await wordRepository.findByWord(data.word)
    if (existing) throw new ConflictError('Word already exists')

    try {
      return await wordRepository.create(data)
    } catch (err) {
      if (err.code === 'P2002') throw new IntegrityError('Unique constraint failed on word')
      throw new DatabaseError('Failed to create word', err.message)
    }
  },

  async update (id, data) {
    const existing = await wordRepository.findById(id)
    if (!existing) throw new NotFoundError('Word not found')

    try {
      return await wordRepository.update(id, data)
    } catch (err) {
      throw new DatabaseError('Failed to update word', err.message)
    }
  },

  async remove (id) {
    const existing = await wordRepository.findById(id)
    if (!existing) throw new NotFoundError('Word not found')

    try {
      await wordRepository.delete(id)
    } catch (err) {
      if (err.code === 'P2003') throw new IntegrityError('Cannot delete word with active relations')
      throw new DatabaseError('Failed to delete word', err.message)
    }
  }
}
