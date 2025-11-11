import prisma from '../prisma/prismaClient.js'

export const userBadgeRepository = {
  async findAll () {
    return prisma.userBadges.findMany()
  },

  async findById (id) {
    return prisma.userBadges.findUnique({ where: { id } })
  },

  async create (data) {
    return prisma.userBadges.create({ data })
  },

  async update (id, data) {
    return prisma.userBadges.update({ where: { id }, data })
  },

  async delete (id) {
    return prisma.userBadges.delete({ where: { id } })
  }
}
