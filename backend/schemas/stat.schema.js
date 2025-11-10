import prisma from '../prisma/prismaClient.js'

export const statsRepository = {
  async findAll () {
    return prisma.testRun.findMany()
  },

  async findById (id) {
    return prisma.testRun.findUnique({ where: { id } })
  },

  async create (data) {
    return prisma.testRun.create({ data })
  },

  async update (id, data) {
    return prisma.testRun.update({ where: { id }, data })
  },

  async delete (id) {
    return prisma.testRun.delete({ where: { id } })
  }
}
