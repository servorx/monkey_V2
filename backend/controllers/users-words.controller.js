import { UsersWordsCreateSchema, UsersWordsUpdateSchema } from '../schemas/users-words.schema.js'
import { IdParamSchema } from '../schemas/core/general.schema.js'
import { userWordService } from '../services/users-words.service.js'

export const usersWordsController = {
  async getAll (req, res, next) {
    try {
      const usersWords = await userWordService.getAll()
      res.status(200).json(usersWords)
    } catch (err) {
      next(err)
    }
  },

  async getByUserId (req, res, next) {
    try {
      // eslint-disable-next-line camelcase
      const { user_id } = IdParamSchema.parse({ user_id: Number(req.params.user_id) })
      const usersWords = await userWordService.getByUserId(user_id)
      res.status(200).json(usersWords)
    } catch (err) {
      next(err)
    }
  },

  async getByUserAndWord (req, res, next) {
    try {
      // eslint-disable-next-line camelcase
      const { user_id, word_id } = IdParamSchema.parse({
        user_id: Number(req.params.user_id),
        word_id: Number(req.params.word_id)
      })
      const usersWords = await userWordService.getByUserAndWord(user_id, word_id)
      res.status(200).json(usersWords)
    } catch (err) {
      next(err)
    }
  },

  async create (req, res, next) {
    try {
      const data = UsersWordsCreateSchema.parse(req.body)
      const newUsersWords = await userWordService.create(data)
      res.status(201).json(newUsersWords)
    } catch (err) {
      next(err)
    }
  },

  async update (req, res, next) {
    try {
      // eslint-disable-next-line camelcase
      const { user_id, word_id } = IdParamSchema.parse({
        user_id: Number(req.params.user_id),
        word_id: Number(req.params.word_id)
      })
      const data = UsersWordsUpdateSchema.parse(req.body)
      const updated = await userWordService.update(user_id, word_id, data)
      res.status(200).json(updated)
    } catch (err) {
      next(err)
    }
  },

  async remove (req, res, next) {
    try {
      // eslint-disable-next-line camelcase
      const { user_id, word_id } = IdParamSchema.parse({
        user_id: Number(req.params.user_id),
        word_id: Number(req.params.word_id)
      })
      await userWordService.remove(user_id, word_id)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}
