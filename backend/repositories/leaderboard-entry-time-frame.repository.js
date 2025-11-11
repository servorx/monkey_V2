import prisma from '../prisma/prismaClient.js'

export const leaderboardEntryTimeFrameRepository = {
  async findAll () {
    return prisma.leaderboardEntriesTimeFrame.findMany()
  },

  async findById (id) {
    return prisma.leaderboardEntriesTimeFrame.findUnique({ where: { id } })
  },

  async create (data) {
    return prisma.leaderboardEntriesTimeFrame.create({ data })
  },

  async update (id, data) {
    return prisma.leaderboardEntriesTimeFrame.update({ where: { id }, data })
  },

  async delete (id) {
    return prisma.leaderboardEntriesTimeFrame.delete({ where: { id } })
  }
}
