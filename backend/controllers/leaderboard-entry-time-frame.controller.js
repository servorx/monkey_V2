import { LeaderboardEntryTimeFrameCreateSchema, LeaderboardEntryTimeFrameUpdateSchema } from '../schemas/leaderboard-entry-time-frame.schema.js'
import { IdParamSchema, NameParamSchema } from '../schemas/core/general.schema.js'
import { leaderboardEntryTimeFrameService } from '../services/leaderboard-entry-time-frame.service.js'

export const leaderboardEntryTimeFrameController = {
  async getAll (res, next) {
    try {
      const leaderboardEntryTimeFrames = await leaderboardEntryTimeFrameService.getAll()
      res.status(200).json(leaderboardEntryTimeFrames)
    } catch (err) {
      next(err)
    }
  },

  async getById (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      const leaderboardEntryTimeFrame = await leaderboardEntryTimeFrameService.getById(id)
      res.status(200).json(leaderboardEntryTimeFrame)
    } catch (err) {
      next(err)
    }
  },

  async getByName (req, res, next) {
    try {
      const { name } = NameParamSchema.parse({ name: req.params.name })
      const leaderboardEntryTimeFrame = await leaderboardEntryTimeFrameService.getByName(name)
      res.status(200).json(leaderboardEntryTimeFrame)
    } catch (err) {
      next(err)
    }
  },

  async create (req, res, next) {
    try {
      const data = LeaderboardEntryTimeFrameCreateSchema.parse(req.body)
      const newLeaderboardEntryTimeFrame = await leaderboardEntryTimeFrameService.create(data)
      res.status(201).json(newLeaderboardEntryTimeFrame)
    } catch (err) {
      next(err)
    }
  },

  async update (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      const data = LeaderboardEntryTimeFrameUpdateSchema.parse(req.body)
      const updated = await leaderboardEntryTimeFrameService.update(id, data)
      res.status(200).json(updated)
    } catch (err) {
      next(err)
    }
  },

  async remove (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      await leaderboardEntryTimeFrameService.remove(id)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}
