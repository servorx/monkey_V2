import { badgeRepository } from '../repositories/badge.repository.js'
import { NotFoundError, DatabaseError, IntegrityError, ConflictError } from '../utils/errors.js'

export const badgeService = {
  async getAll () {
    try {
      return await badgeRepository.findAll()
    } catch (err) {
      throw new DatabaseError('Failed to fetch badges', err.message)
    }
  },

  async getById (id) {
    const badge = await badgeRepository.findById(id)
    if (!badge) throw new NotFoundError('Badge not found')
    return badge
  },

  async getByName (name) {
    const badge = await badgeRepository.findByName(name)
    if (!badge) throw new NotFoundError('Badge not found')
    return badge
  },

  async create (data) {
    const existing = await badgeRepository.findByName(data.name)
    if (existing) throw new ConflictError('Badge name already in use')
    try {
      return await badgeRepository.create(data)
    } catch (err) {
      if (err.code === 'P2002') throw new IntegrityError('Unique constraint failed on badge')
      throw new DatabaseError('Failed to create badge', err.message)
    }
  },

  async update (id, data) {
    const existing = await badgeRepository.findByName(data.name)
    if (existing) throw new ConflictError('Badge name already in use')
    try {
      return await badgeRepository.update(id, data)
    } catch (err) {
      throw new DatabaseError('Failed to update badge', err.message)
    }
  },

  async remove (id) {
    const existing = await badgeRepository.findById(id)
    if (!existing) throw new NotFoundError('Badge not found')
    try {
      await badgeRepository.delete(id)
    } catch (err) {
      if (err.code === 'P2003') throw new IntegrityError('Cannot delete badge with active relations')
      throw new DatabaseError('Failed to delete badge', err.message)
    }
  }
}
