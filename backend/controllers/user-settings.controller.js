import { UserSettingsCreateSchema, UserSettingsUpdateSchema } from '../schemas/user-settings.schema.js'
import { IdParamSchema } from '../schemas/core/general.schema.js'
import { userSettingService } from '../services/user-settings.service.js'

export const userSettingController = {
  async getAll (res, next) {
    try {
      const userSettings = await userSettingService.getAll()
      res.status(200).json(userSettings)
    } catch (err) {
      next(err)
    }
  },

  async getByUserId (req, res, next) {
    try {
      // eslint-disable-next-line camelcase
      const { user_id } = IdParamSchema.parse({ user_id: Number(req.params.user_id) })
      const userSettings = await userSettingService.getByUserId(user_id)
      res.status(200).json(userSettings)
    } catch (err) {
      next(err)
    }
  },

  async create (req, res, next) {
    try {
      const data = UserSettingsCreateSchema.parse(req.body)
      const newUserSettings = await userSettingService.create(data)
      res.status(201).json(newUserSettings)
    } catch (err) {
      next(err)
    }
  },

  async update (req, res, next) {
    try {
      // eslint-disable-next-line camelcase
      const { user_id } = IdParamSchema.parse({ user_id: Number(req.params.user_id) })
      const data = UserSettingsUpdateSchema.parse(req.body)
      const updated = await userSettingService.update(user_id, data)
      res.status(200).json(updated)
    } catch (err) {
      next(err)
    }
  },

  async remove (req, res, next) {
    try {
      // eslint-disable-next-line camelcase
      const { user_id } = IdParamSchema.parse({ user_id: Number(req.params.user_id) })
      await userSettingService.remove(user_id)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}
