import { WordCreateSchema, WordUpdateSchema } from '../schemas/word.schema.js'
import { IdParamSchema, NameParamSchema } from '../schemas/core/general.schema.js'
import { wordService } from '../services/word.service.js'

export const wordController = {
  async getAll (req, res, next) {
    try {
      const words = await wordService.getAll()
      res.status(200).json(words)
    } catch (err) {
      next(err)
    }
  },

  async getById (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      const word = await wordService.getById(id)
      res.status(200).json(word)
    } catch (err) {
      next(err)
    }
  },

  async getByName (req, res, next) {
    try {
      const { name } = NameParamSchema.parse({ name: req.params.name })
      const word = await wordService.getByName(name)
      res.status(200).json(word)
    } catch (err) {
      next(err)
    }
  },

  async create (req, res, next) {
    try {
      const data = WordCreateSchema.parse(req.body)
      const newWord = await wordService.create(data)
      res.status(201).json(newWord)
    } catch (err) {
      next(err)
    }
  },

  async update (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      const data = WordUpdateSchema.parse(req.body)
      const updated = await wordService.update(id, data)
      res.status(200).json(updated)
    } catch (err) {
      next(err)
    }
  },

  async remove (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      await wordService.remove(id)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}
