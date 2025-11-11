import prisma from '../prisma/prismaClient.js'

export const badgeRepository = {
  async findAll () {
    return prisma.badge.findMany()
  },

  async findById (id) {
    return prisma.badge.findUnique({ where: { id } })
  },

  async create (data) {
    return prisma.badge.create({ data })
  },

  async update (id, data) {
    return prisma.badge.update({ where: { id }, data })
  },

  async delete (id) {
    return prisma.badge.delete({ where: { id } })
  }
}
