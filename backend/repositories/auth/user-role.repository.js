import { prisma } from '../../prisma/prismaClient.js'

export const userRoleRepository = {
  async findAll () {
    return prisma.userRole.findMany()
  },
  async create (data) {
    return prisma.userRole.create({ data })
  },
  async update (id, data) {
    return prisma.userRole.update({ where: { id }, data })
  },
  async delete (id) {
    return prisma.userRole.delete({ where: { id } })
  }
}
