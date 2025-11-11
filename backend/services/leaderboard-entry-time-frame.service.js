import { leaderboardEntryTimeFrameRepository } from '../repositories/leaderboard-time-frame.repository.js'
import {
  ValidationError,
  NotFoundError,
  ConflictError,
  DatabaseError
} from '../utils/errors.js'

export const leaderboardTimeFrameService = {
  async getAll () {
    return leaderboardEntryTimeFrameRepository.findAll()
  },

  async getById (id) {
    const timeFrame = await leaderboardEntryTimeFrameRepository.findById(id)
    if (!timeFrame) throw new NotFoundError('Leaderboard time frame not found')
    return timeFrame
  },

  async create (data) {
    if (!data.time_frame || data.time_frame.trim().length === 0) {
      throw new ValidationError('Time frame name is required')
    }

    const existing = await leaderboardEntryTimeFrameRepository.findByName(data.time_frame)
    if (existing) throw new ConflictError('Time frame already exists')

    try {
      return await leaderboardEntryTimeFrameRepository.create(data)
    } catch (err) {
      throw new DatabaseError('Failed to create time frame', err.message)
    }
  },

  async update (id, data) {
    const existing = await leaderboardEntryTimeFrameRepository.findById(id)
    if (!existing) throw new NotFoundError('Leaderboard time frame not found')

    try {
      return await leaderboardEntryTimeFrameRepository.update(id, data)
    } catch (err) {
      throw new DatabaseError('Failed to update time frame', err.message)
    }
  },

  async remove (id) {
    const existing = await leaderboardEntryTimeFrameRepository.findById(id)
    if (!existing) throw new NotFoundError('Leaderboard time frame not found')

    try {
      await leaderboardEntryTimeFrameRepository.delete(id)
    } catch (err) {
      throw new DatabaseError('Failed to delete time frame', err.message)
    }
  }
}
