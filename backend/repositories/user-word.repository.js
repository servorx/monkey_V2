import prisma from '../prisma/prismaClient.js'

export const userWordRepository = {
  async findAll () {
    return prisma.usersWords.findMany()
  },

  async findById (id) {
    return prisma.usersWords.findUnique({ where: { id } })
  },

  async create (data) {
    return prisma.usersWords.create({ data })
  },

  async update (id, data) {
    return prisma.usersWords.update({ where: { id }, data })
  },

  async delete (id) {
    return prisma.usersWords.delete({ where: { id } })
  }
}
