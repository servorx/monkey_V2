import { languageRepository } from '../repositories/language.repository.js'
import {
  ValidationError,
  ConflictError,
  NotFoundError,
  DatabaseError,
  IntegrityError
} from '../utils/errors.js'

export const languageService = {
  async getAll () {
    try {
      return await languageRepository.findAll()
    } catch (err) {
      throw new DatabaseError('Failed to fetch languages', err.message)
    }
  },

  async getById (id) {
    const lang = await languageRepository.findById(id)
    if (!lang) throw new NotFoundError('Language not found')
    return lang
  },

  async create (data) {
    if (!data.name || data.name.trim().length < 2) {
      throw new ValidationError('Language name must be at least 2 characters long')
    }

    const existing = await languageRepository.findByName(data.name)
    if (existing) throw new ConflictError('Language already exists')

    try {
      return await languageRepository.create(data)
    } catch (err) {
      if (err.code === 'P2002') throw new IntegrityError('Duplicate language name')
      throw new DatabaseError('Failed to create language', err.message)
    }
  },

  async update (id, data) {
    const lang = await languageRepository.findById(id)
    if (!lang) throw new NotFoundError('Language not found')

    try {
      return await languageRepository.update(id, data)
    } catch (err) {
      if (err.code === 'P2002') throw new IntegrityError('Duplicate language name')
      throw new DatabaseError('Failed to update language', err.message)
    }
  },

  async remove (id) {
    const lang = await languageRepository.findById(id)
    if (!lang) throw new NotFoundError('Language not found')

    try {
      await languageRepository.delete(id)
    } catch (err) {
      throw new DatabaseError('Failed to delete language', err.message)
    }
  }
}
