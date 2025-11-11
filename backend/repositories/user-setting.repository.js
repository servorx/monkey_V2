import prisma from '../prisma/prismaClient.js'

export const userSettingRepository = {
  async findAll () {
    return prisma.userSettings.findMany()
  },

  async findById (id) {
    return prisma.userSettings.findUnique({ where: { id } })
  },

  async create (data) {
    return prisma.userSettings.create({ data })
  },

  async update (id, data) {
    return prisma.userSettings.update({ where: { id }, data })
  },

  async delete (id) {
    return prisma.userSettings.delete({ where: { id } })
  }
}
