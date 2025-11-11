import { LeaderboardEntryCreateSchema, LeaderboardEntryUpdateSchema } from '../schemas/leaderboard-entry.schema.js'
import { IdParamSchema } from '../schemas/core/general.schema.js'
import { leaderboardEntryService } from '../services/leaderboard-entry.service.js'

export const leaderboardEntryController = {
  async getAll (res, next) {
    try {
      const leaderboardEntries = await leaderboardEntryService.getAll()
      res.status(200).json(leaderboardEntries)
    } catch (err) {
      next(err)
    }
  },

  async getById (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      const leaderboardEntry = await leaderboardEntryService.getById(id)
      res.status(200).json(leaderboardEntry)
    } catch (err) {
      next(err)
    }
  },

  async getByUserAndTimeFrame (req, res, next) {
    try {
      // eslint-disable-next-line camelcase
      const { user_id, time_frame_id } = IdParamSchema.parse({
        user_id: Number(req.params.user_id),
        time_frame_id: Number(req.params.time_frame_id)
      })
      const leaderboardEntry = await leaderboardEntryService.getByUserAndTimeFrame(user_id, time_frame_id)
      res.status(200).json(leaderboardEntry)
    } catch (err) {
      next(err)
    }
  },

  async create (req, res, next) {
    try {
      const data = LeaderboardEntryCreateSchema.parse(req.body)
      const newLeaderboardEntry = await leaderboardEntryService.create(data)
      res.status(201).json(newLeaderboardEntry)
    } catch (err) {
      next(err)
    }
  },

  async update (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      const data = LeaderboardEntryUpdateSchema.parse(req.body)
      const updated = await leaderboardEntryService.update(id, data)
      res.status(200).json(updated)
    } catch (err) {
      next(err)
    }
  },

  async remove (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      await leaderboardEntryService.remove(id)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}
