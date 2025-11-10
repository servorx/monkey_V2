import prisma from '../../prisma/prismaClient.js'

export const refreshTokenRepository = {
  async findAll () {
    return prisma.refreshToken.findMany()
  },

  async findById (id) {
    return prisma.refreshToken.findUnique({ where: { id } })
  },

  async create (data) {
    return prisma.refreshToken.create({ data })
  },

  async update (id, data) {
    return prisma.refreshToken.update({ where: { id }, data })
  },

  async delete (id) {
    return prisma.refreshToken.delete({ where: { id } })
  }
}
