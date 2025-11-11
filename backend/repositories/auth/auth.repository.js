import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../prisma/prismaClient.js'
import { SALT_ROUNDS, SECRET_JWT_KEY, JWT_EXPIRES_IN_MINUTES, REFRESH_TOKEN_EXPIRES_DAYS } from '../../config/config.js'

// funcion encargada de manejar el login y el logout
export const authRepository = {
  async register (data) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })
    if (existingUser) throw new Error('El correo electrónico ya está registrado')

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS)

    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword
      },
      select: {
        id: true,
        username: true,
        email: true,
        created_at: true
      }
    })
    return user
  },

  async login (data) {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    })
    if (!user) throw new Error('Usuario no encontrado')

    const isPasswordValid = await bcrypt.compare(data.password, user.password)
    if (!isPasswordValid) throw new Error('Contraseña incorrecta')

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_JWT_KEY,
      { expiresIn: JWT_EXPIRES_IN_MINUTES }
    )

    const refreshToken = jwt.sign(
      { id: user.id },
      SECRET_JWT_KEY,
      { expiresIn: `${REFRESH_TOKEN_EXPIRES_DAYS}d` } // Ej: '7d'
    )

    // Guardamos el refresh token en la base de datos
    await prisma.refreshToken.create({
      data: {
        user_id: user.id,
        token: refreshToken
      }
    })

    const safeUser = {
      id: user.id,
      username: user.username,
      email: user.email
    }

    return { accessToken, refreshToken, user: safeUser }
  },

  /**
   * Genera nuevos tokens a partir de un refresh token válido.
   * @param {string} token - Token de actualización.
   * @returns {Promise<{accessToken: string, refreshToken: string}>}
   */
  async refreshTokens (token) {
    try {
      const payload = jwt.verify(token, SECRET_JWT_KEY)

      const storedToken = await prisma.refreshToken.findFirst({
        where: { user_id: payload.id, token }
      })

      if (!storedToken) {
        throw new Error('Refresh token inválido o expirado')
      }

      const newAccessToken = jwt.sign(
        { id: payload.id },
        SECRET_JWT_KEY,
        { expiresIn: JWT_EXPIRES_IN_MINUTES }
      )

      const newRefreshToken = jwt.sign(
        { id: payload.id },
        SECRET_JWT_KEY,
        { expiresIn: `${REFRESH_TOKEN_EXPIRES_DAYS}d` }
      )

      // Actualizar el token almacenado en BD
      await prisma.refreshToken.update({
        where: { id: storedToken.id },
        data: { token: newRefreshToken }
      })

      return { accessToken: newAccessToken, refreshToken: newRefreshToken }
    } catch (err) {
      throw new Error('Error al refrescar los tokens')
    }
  },

  async logout (token) {
    await prisma.refreshToken.deleteMany({ where: { token } })
  }
}
