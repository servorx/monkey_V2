import { leaderboardEntryRepository } from '../repositories/leaderboard-entry.repository'

export const leaderboardEntryService = {
  async getAllLeaderboardEntries () {
    return leaderboardEntryRepository.findAll()
  },

  async getLeaderboardEntryById (id) {
    const leaderboardEntry = await leaderboardEntryRepository.findById(id)
    if (!leaderboardEntry) throw new Error('Leaderboard entry not found')
    return leaderboardEntry
  },

  async createLeaderboardEntry (data) {
    const existing = await leaderboardEntryRepository.findByUserId(data.user_id)
    if (existing) throw new Error('Leaderboard entry already in use')
    return leaderboardEntryRepository.create(data)
  },

  async updateLeaderboardEntry (id, data) {
    return leaderboardEntryRepository.update(id, data)
  },

  async deleteLeaderboardEntry (id) {
    return leaderboardEntryRepository.delete(id)
  }
}
