import { userWordRepository } from '../repositories/userWord.repository.js'
import {
  NotFoundError,
  ConflictError,
  ValidationError,
  IntegrityError,
  DatabaseError
} from '../utils/errors.js'

export const userWordService = {
  async getAll () {
    try {
      return await userWordRepository.findAll()
    } catch (err) {
      throw new DatabaseError('Failed to fetch user words', err.message)
    }
  },

  async getAllByUser (userId) {
    if (!userId) throw new ValidationError('User ID is required')

    try {
      const words = await userWordRepository.findByUserId(userId)
      return words
    } catch (err) {
      throw new DatabaseError('Failed to fetch user words', err.message)
    }
  },

  async create (userId, wordId) {
    if (!userId || !wordId) {
      throw new ValidationError('User ID and Word ID are required')
    }

    const existing = await userWordRepository.findByCompositeKey(userId, wordId)
    if (existing) throw new ConflictError('Word already added to favorites')

    try {
      return await userWordRepository.create({ user_id: userId, word_id: wordId })
    } catch (err) {
      if (err.code === 'P2003') throw new IntegrityError('Invalid user or word reference')
      throw new DatabaseError('Failed to add user word', err.message)
    }
  },

  async remove (userId, wordId) {
    const existing = await userWordRepository.findByCompositeKey(userId, wordId)
    if (!existing) throw new NotFoundError('Word not found in user list')

    try {
      await userWordRepository.delete(userId, wordId)
    } catch (err) {
      throw new DatabaseError('Failed to remove user word', err.message)
    }
  },

  async update (userId, wordId, data) {
    const existing = await userWordRepository.findByCompositeKey(userId, wordId)
    if (!existing) throw new NotFoundError('Word not found in user list')

    try {
      return await userWordRepository.update(userId, wordId, data)
    } catch (err) {
      throw new DatabaseError('Failed to update user word', err.message)
    }
  }
}
