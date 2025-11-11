import { BadgeCreateSchema, BadgeUpdateSchema } from '../schemas/badge.schema.js'
import { IdParamSchema, NameParamSchema } from '../schemas/core/general.schema.js'
import { badgeService } from '../services/badge.service.js'

export const badgeController = {
  async getAll (req, res, next) {
    try {
      const badges = await badgeService.getAll()
      res.status(200).json(badges)
    } catch (err) {
      next(err)
    }
  },

  async getById (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      const badge = await badgeService.getById(id)
      res.status(200).json(badge)
    } catch (err) {
      next(err)
    }
  },

  async getByName (req, res, next) {
    try {
      const { name } = NameParamSchema.parse({ name: req.params.name })
      const badge = await badgeService.getByName(name)
      res.status(200).json(badge)
    } catch (err) {
      next(err)
    }
  },

  async create (req, res, next) {
    try {
      const data = BadgeCreateSchema.parse(req.body)
      const newBadge = await badgeService.create(data)
      res.status(201).json(newBadge)
    } catch (err) { next(err) }
  },

  async update (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      const { data } = BadgeUpdateSchema.parse(req.body)
      const updated = await badgeService.update(id, data)
      res.status(200).json(updated)
    } catch (err) { next(err) }
  },
  async remove (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      await badgeService.remove(id)
      res.status(204).send()
    } catch (err) { next(err) }
  }
}
