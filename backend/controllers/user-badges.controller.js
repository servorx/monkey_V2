import { UserBadgeCreateSchema, UserBadgeUpdateSchema } from '../schemas/user-badge.schema.js'
import { IdParamSchema } from '../schemas/core/general.schema.js'
import { userBadgeService } from '../services/user-badge.service.js'

export const userBadgeController = {
  async getAll (res, next) {
    try {
      const userBadges = await userBadgeService.getAll()
      res.status(200).json(userBadges)
    } catch (err) {
      next(err)
    }
  },

  async getByUserId (req, res, next) {
    try {
      // eslint-disable-next-line camelcase
      const { user_id } = IdParamSchema.parse({ user_id: Number(req.params.user_id) })
      const userBadges = await userBadgeService.getByUserId(user_id)
      res.status(200).json(userBadges)
    } catch (err) {
      next(err)
    }
  },

  async getByUserAndBadge (req, res, next) {
    try {
      // eslint-disable-next-line camelcase
      const { user_id, badge_id } = IdParamSchema.parse({
        user_id: Number(req.params.user_id),
        badge_id: Number(req.params.badge_id)
      })
      const userBadge = await userBadgeService.getByUserAndBadge(user_id, badge_id)
      res.status(200).json(userBadge)
    } catch (err) {
      next(err)
    }
  },

  async create (req, res, next) {
    try {
      const data = UserBadgeCreateSchema.parse(req.body)
      const newUserBadge = await userBadgeService.create(data)
      res.status(201).json(newUserBadge)
    } catch (err) {
      next(err)
    }
  },

  async update (req, res, next) {
    try {
      // eslint-disable-next-line camelcase
      const { user_id, badge_id } = IdParamSchema.parse({
        user_id: Number(req.params.user_id),
        badge_id: Number(req.params.badge_id)
      })
      const data = UserBadgeUpdateSchema.parse(req.body)
      const updated = await userBadgeService.update(user_id, badge_id, data)
      res.status(200).json(updated)
    } catch (err) {
      next(err)
    }
  },

  async remove (req, res, next) {
    try {
      // eslint-disable-next-line camelcase
      const { user_id, badge_id } = IdParamSchema.parse({
        user_id: Number(req.params.user_id),
        badge_id: Number(req.params.badge_id)
      })
      await userBadgeService.remove(user_id, badge_id)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}
