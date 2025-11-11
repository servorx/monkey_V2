import { leaderboardEntryRepository } from '../repositories/leaderboard-entry.repository.js'
import {
  ValidationError,
  NotFoundError,
  ConflictError,
  IntegrityError,
  DatabaseError
} from '../utils/errors.js'

export const leaderboardEntryService = {
  async getAll () {
    return leaderboardEntryRepository.findAll()
  },

  async getById (id) {
    const entry = await leaderboardEntryRepository.findById(id)
    if (!entry) throw new NotFoundError('Leaderboard entry not found')
    return entry
  },

  async create (data) {
    if (!data.user_id || !data.test_run_id || !data.time_frame_id) {
      throw new ValidationError('Missing required fields: user_id, test_run_id, time_frame_id')
    }

    const existing = await leaderboardEntryRepository.findByUserAndTimeFrame(data.user_id, data.time_frame_id)
    if (existing) throw new ConflictError('Leaderboard entry already exists for this user and timeframe')

    try {
      return await leaderboardEntryRepository.create(data)
    } catch (err) {
      if (err.code === 'P2003') throw new IntegrityError('Invalid foreign key reference in leaderboard entry')
      throw new DatabaseError('Failed to create leaderboard entry', err.message)
    }
  },

  async update (id, data) {
    const existing = await leaderboardEntryRepository.findById(id)
    if (!existing) throw new NotFoundError('Leaderboard entry not found')

    try {
      return await leaderboardEntryRepository.update(id, data)
    } catch (err) {
      if (err.code === 'P2003') throw new IntegrityError('Invalid foreign key reference')
      throw new DatabaseError('Failed to update leaderboard entry', err.message)
    }
  },

  async remove (id) {
    const existing = await leaderboardEntryRepository.findById(id)
    if (!existing) throw new NotFoundError('Leaderboard entry not found')

    try {
      await leaderboardEntryRepository.delete(id)
    } catch (err) {
      throw new DatabaseError('Failed to delete leaderboard entry', err.message)
    }
  }
}
