import prisma from '../prisma/prismaClient.js'

export const wordRepository = {
  async findAll () {
    return prisma.words.findMany()
  },

  async findById (id) {
    return prisma.words.findUnique({ where: { id } })
  },

  async findByWord (word) {
    return prisma.words.findUnique({ where: { word } })
  },

  async create (data) {
    return prisma.words.create({ data })
  },

  async update (id, data) {
    return prisma.words.update({ where: { id }, data })
  },

  async delete (id) {
    return prisma.words.delete({ where: { id } })
  }
}
