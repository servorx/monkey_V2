import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_DAYS } from '../../config/config.js'
import { UserRepository } from '../repositories/userRepository.js'
import prisma from '../../repositories/prisma/prismaClient.js'
import cryptoRandom from 'crypto-random-string'

// TODO: revisar todo eso
export const authService = {
  async register ({ username, email, password }) {
    const existing = await UserRepository.findByEmail(email)
    if (existing) throw Object.assign(new Error('Email already in use'), { status: 400 })

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    const user = await UserRepository.create({ username, email, password: hashed })
    return user
  },

  async login ({ email, password }) {
    const user = await UserRepository.findByEmail(email)
    if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 })
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw Object.assign(new Error('Invalid credentials'), { status: 401 })

    const accessToken = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
    // TODO: implementar la funcion para poder crear el cruptoRandom
    const refreshToken = cryptoRandom() // implementa función que genere token seguro

    // persist refresh token
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + parseInt(REFRESH_TOKEN_EXPIRES_DAYS))
    await prisma.refreshToken.create({
      data: { token: refreshToken, userId: user.id, expires_at: expiresAt }
    })

    return { accessToken, refreshToken, user: { id: user.id, username: user.username, email: user.email } }
  }
}
