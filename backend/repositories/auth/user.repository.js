import prisma from '../../prisma/prismaClient.js'

export const userRepository = {
  async findAll () {
    return prisma.user.findMany()
  },

  async findById (id) {
    return prisma.user.findUnique({ where: { id } })
  },

  async findByEmail (email) {
    return prisma.user.findUnique({ where: { email } })
  },

  async create (data) {
    return prisma.user.create({ data })
  },

  async update (id, data) {
    return prisma.user.update({ where: { id }, data })
  },

  async delete (id) {
    return prisma.user.delete({ where: { id } })
  }
}
