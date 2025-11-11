import prisma from '../prisma/prismaClient.js'

export const languageRepository = {
  async findAll () {
    return prisma.language.findMany()
  },

  async findById (id) {
    return prisma.language.findUnique({ where: { id } })
  },

  async create (data) {
    return prisma.language.create({ data })
  },

  async update (id, data) {
    return prisma.language.update({ where: { id }, data })
  },

  async delete (id) {
    return prisma.language.delete({ where: { id } })
  }
}
