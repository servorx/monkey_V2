import prisma from '../prisma/prismaClient.js'

export const wordMasteryRepository = {
  async findAll () {
    return prisma.wordMastery.findMany()
  },

  async findById (id) {
    return prisma.wordMastery.findUnique({ where: { id } })
  },

  async create (data) {
    return prisma.wordMastery.create({ data })
  },

  async update (id, data) {
    return prisma.wordMastery.update({ where: { id }, data })
  },

  async delete (id) {
    return prisma.wordMastery.delete({ where: { id } })
  }
}
