import { wordMasteryRepository } from '../repositories/word-mastery.repository.js'
import {
  NotFoundError,
  ConflictError,
  ValidationError,
  IntegrityError,
  DatabaseError
} from '../utils/errors.js'

export const wordMasteryService = {
  async getByUser (userId) {
    if (!userId) throw new ValidationError('User ID is required')
    try {
      return await wordMasteryRepository.findByUserId(userId)
    } catch (err) {
      throw new DatabaseError('Failed to fetch user mastery data', err.message)
    }
  },

  async getByUserAndWord (userId, wordId) {
    if (!userId || !wordId) throw new ValidationError('User ID and Word ID are required')
    const mastery = await wordMasteryRepository.findByCompositeKey(userId, wordId)
    if (!mastery) throw new NotFoundError('Word mastery record not found')
    return mastery
  },

  async create (data) {
    if (!data.user_id || !data.word_id) {
      throw new ValidationError('User ID and Word ID are required')
    }

    const existing = await wordMasteryRepository.findByCompositeKey(data.user_id, data.word_id)
    if (existing) throw new ConflictError('Word mastery record already exists')

    try {
      return await wordMasteryRepository.create(data)
    } catch (err) {
      if (err.code === 'P2003') throw new IntegrityError('Invalid user or word reference')
      throw new DatabaseError('Failed to create word mastery record', err.message)
    }
  },

  async update (userId, wordId, data) {
    const existing = await wordMasteryRepository.findByCompositeKey(userId, wordId)
    if (!existing) throw new NotFoundError('Word mastery record not found')

    try {
      return await wordMasteryRepository.update(userId, wordId, data)
    } catch (err) {
      throw new DatabaseError('Failed to update word mastery', err.message)
    }
  },

  async remove (userId, wordId) {
    const existing = await wordMasteryRepository.findByCompositeKey(userId, wordId)
    if (!existing) throw new NotFoundError('Word mastery record not found')

    try {
      await wordMasteryRepository.delete(userId, wordId)
    } catch (err) {
      throw new DatabaseError('Failed to delete word mastery record', err.message)
    }
  }
}
