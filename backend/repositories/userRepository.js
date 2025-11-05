import prisma from './prisma/prismaClient.js'

export const UserRepository = {
  // metodos de consulta
  async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } })
  },
  async findById(id) {
    return prisma.user.findUnique({ where: { id } })
  },
  async findAll() {
    return prisma.user.findMany()
  },
  // metodos de modificacion y creacion
  async create(data) {
    return prisma.user.create({ data })
  },
  async update(id, data) {
    return prisma.user.update({ where: { id }, data })
  },
  async delete(id) {
    return prisma.user.delete({ where: { id } })
  },
}
