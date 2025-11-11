import prisma from '../prisma/prismaClient.js'

export const languageWordRepository = {
  async findAll () {
    return prisma.languagesWords.findMany()
  },

  async findById (id) {
    return prisma.languagesWords.findUnique({ where: { id } })
  },

  async create (data) {
    return prisma.languagesWords.create({ data })
  },

  async update (id, data) {
    return prisma.languagesWords.update({ where: { id }, data })
  },

  async delete (id) {
    return prisma.languagesWords.delete({ where: { id } })
  }
}
