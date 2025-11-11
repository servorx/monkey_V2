import { leaderboardEntryTimeFrameRepository } from '../repositories/leaderboard-entry-time-frame.repository.js'

export const leaderboardEntryTimeFrameService = {
  async getAllLeaderboardEntryTimeFrames () {
    return leaderboardEntryTimeFrameRepository.findAll()
  },

  async getLeaderboardEntryTimeFrameById (id) {
    const leaderboardEntryTimeFrame = await leaderboardEntryTimeFrameRepository.findById(id)
    if (!leaderboardEntryTimeFrame) throw new Error('Leaderboard entry time frame not found')
    return leaderboardEntryTimeFrame
  },

  async createLeaderboardEntryTimeFrame (data) {
    const existing = await leaderboardEntryTimeFrameRepository.findByTimeFrame(data.time_frame)
    if (existing) throw new Error('Leaderboard entry time frame already in use')
    return leaderboardEntryTimeFrameRepository.create(data)
  },

  async updateLeaderboardEntryTimeFrame (id, data) {
    return leaderboardEntryTimeFrameRepository.update(id, data)
  },

  async deleteLeaderboardEntryTimeFrame (id) {
    return leaderboardEntryTimeFrameRepository.delete(id)
  }
}
