import { RefreshTokenCreateSchema, RefreshTokenUpdateSchema } from '../../schemas/auth/refresh-token.schema.js'
import { refreshTokenService } from '../../services/auth/refresh-token.service.js'

export const refreshTokenController = {
  async getAll (req, res) {
    const refreshTokens = await refreshTokenService.getAllRefreshTokens()
    res.json(refreshTokens)
  },

  async getById (req, res) {
    const { id } = req.params
    const refreshToken = await refreshTokenService.getRefreshTokenById(Number(id))
    res.json(refreshToken)
  },

  async create (req, res) {
    try {
      const data = RefreshTokenCreateSchema.parse(req.body)
      const newRefreshToken = await refreshTokenService.createRefreshToken(data)
      res.status(201).json(newRefreshToken)
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ errors: error.errors })
      }
      res.status(500).json({ message: error.message })
    }
  },

  async update (req, res) {
    const { id } = req.params
    const data = RefreshTokenUpdateSchema.parse(req.body)
    const updated = await refreshTokenService.updateRefreshToken(Number(id), data)
    res.json(updated)
  },

  async remove (req, res) {
    const { id } = req.params
    await refreshTokenService.deleteRefreshToken(Number(id))
    res.status(204).send()
  }
}
