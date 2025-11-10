import { refreshTokenRepository } from '../../repositories/auth/refresh-token.repository.js'

export const refreshTokenService = {
  async getAllRefreshTokens () {
    return refreshTokenRepository.findAll()
  },

  async getRefreshTokenById (id) {
    const refreshToken = await refreshTokenRepository.findById(id)
    if (!refreshToken) throw new Error('RefreshToken not found')
    return refreshToken
  },

  async createRefreshToken (data) {
    const existing = await refreshTokenRepository.findById(data.id)
    if (existing) throw new Error('RefreshToken already exists')
    return refreshTokenRepository.create(data)
  },

  async updateRefreshToken (id, data) {
    return refreshTokenRepository.update(id, data)
  },

  async deleteRefreshToken (id) {
    return refreshTokenRepository.delete(id)
  }
}
