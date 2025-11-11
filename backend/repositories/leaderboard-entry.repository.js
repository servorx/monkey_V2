import prisma from '../prisma/prismaClient.js'

export const leaderboardEntryRepository = {
  async findAll () {
    return prisma.leaderboardEntries.findMany()
  },

  async findById (id) {
    return prisma.leaderboardEntries.findUnique({ where: { id } })
  },

  async create (data) {
    return prisma.leaderboardEntries.create({ data })
  },

  async update (id, data) {
    return prisma.leaderboardEntries.update({ where: { id }, data })
  },

  async delete (id) {
    return prisma.leaderboardEntries.delete({ where: { id } })
  }
}
