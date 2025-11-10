import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SALT_ROUNDS, SECRET_JWT_KEY, JWT_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_DAYS } from '../../config/config.js'
import prisma from '../../prisma/prismaClient.js'

export const authRepository = {
  async register (data) {
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS)
    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword
      }
    })
    return user
  },

  async login (data) {
    const user = await prisma.user.findUnique({ where: { email: data.email } })
    if (!user) {
      throw new Error('No se encontro el usuario')
    }
    const isPasswordCorrect = await bcrypt.compare(data.password, user.password)
    if (!isPasswordCorrect) {
      throw new Error('Contraseña incorrecta')
    }
    const token = jwt.sign({ id: user.id }, SECRET_JWT_KEY, { expiresIn: JWT_EXPIRES_IN })
    const refreshToken = jwt.sign({ id: user.id }, SECRET_JWT_KEY, { expiresIn: `${REFRESH_TOKEN_EXPIRES_DAYS} days` })
    return { token, refreshToken }
  }
}
