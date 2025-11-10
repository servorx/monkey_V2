import prisma from '../../prisma/prismaClient.js'

export const roleRepository = {
  async findAll () {
    return prisma.role.findMany()
  },
  async create (data) {
    return prisma.role.create({ data })
  },
  async update (id, data) {
    return prisma.role.update({ where: { id }, data })
  },
  async delete (id) {
    return prisma.role.delete({ where: { id } })
  }
}
