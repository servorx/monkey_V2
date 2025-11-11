import prisma from '../prisma/prismaClient.js'

export const testRunRepository = {
  async findAll () {
    return prisma.testRuns.findMany()
  },

  async findById (id) {
    return prisma.testRuns.findUnique({ where: { id } })
  },

  async create (data) {
    return prisma.testRuns.create({ data })
  },

  async update (id, data) {
    return prisma.testRuns.update({ where: { id }, data })
  },

  async delete (id) {
    return prisma.testRuns.delete({ where: { id } })
  }
}
