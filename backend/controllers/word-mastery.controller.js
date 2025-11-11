import { WordMasteryCreateSchema, WordMasteryUpdateSchema } from '../schemas/word-mastery.schema.js'
import { IdParamSchema } from '../schemas/core/general.schema.js'
import { wordMasteryService } from '../services/word-mastery.service.js'

export const wordMasteryController = {
  async getByUser (req, res, next) {
    try {
      // eslint-disable-next-line camelcase
      const { user_id } = IdParamSchema.parse({ user_id: Number(req.params.user_id) })
      const wordMastery = await wordMasteryService.getByUser(user_id)
      res.status(200).json(wordMastery)
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
      const wordMastery = await wordMasteryService.getByUserAndWord(user_id, word_id)
      res.status(200).json(wordMastery)
    } catch (err) {
      next(err)
    }
  },

  async create (req, res, next) {
    try {
      const data = WordMasteryCreateSchema.parse(req.body)
      const newWordMastery = await wordMasteryService.create(data)
      res.status(201).json(newWordMastery)
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
      const data = WordMasteryUpdateSchema.parse(req.body)
      const updated = await wordMasteryService.update(user_id, word_id, data)
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
      await wordMasteryService.remove(user_id, word_id)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}
