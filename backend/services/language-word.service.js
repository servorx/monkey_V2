import { languageRepository } from '../repositories/language.repository.js'
import {
  NotFoundError,
  ConflictError,
  IntegrityError,
  DatabaseError
} from '../utils/errors.js'

export const languageWordService = {
  async getAll () {
    try {
      return await languageRepository.findAll()
    } catch (err) {
      throw new DatabaseError('Failed to fetch languages', err.message)
    }
  },

  async getById (id) {
    const language = await languageRepository.findById(id)
    if (!language) throw new NotFoundError('Language not found')
    return language
  },

  async getByName (name) {
    const language = await languageRepository.findByName(name)
    if (!language) throw new NotFoundError('Language not found')
    return language
  },

  async create (data) {
    const existing = await languageRepository.findByName(data.name)
    if (existing) throw new ConflictError('Language name already in use')
    try {
      return await languageRepository.create(data)
    } catch (err) {
      if (err.code === 'P2002') throw new IntegrityError('Unique constraint failed on language')
      throw new DatabaseError('Failed to create language', err.message)
    }
  },

  async update (id, data) {
    const existing = await languageRepository.findById(id)
    if (!existing) throw new NotFoundError('Language not found')
    try {
      return await languageRepository.update(id, data)
    } catch (err) {
      throw new DatabaseError('Failed to update language', err.message)
    }
  },

  async remove (id) {
    const existing = await languageRepository.findById(id)
    if (!existing) throw new NotFoundError('Language not found')
    try {
      await languageRepository.delete(id)
    } catch (err) {
      if (err.code === 'P2003') throw new IntegrityError('Cannot delete language with active relations')
      throw new DatabaseError('Failed to delete language', err.message)
    }
  }
}
