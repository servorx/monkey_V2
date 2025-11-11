import { LanguageWordCreateSchema, LanguageWordUpdateSchema } from '../schemas/language-word.schema.js'
import { IdParamSchema, NameParamSchema } from '../schemas/core/general.schema.js'
import { languageWordService } from '../services/language-word.service.js'

export const languageWordController = {
  async getAll (req, res, next) {
    try {
      const languagesWords = await languageWordService.getAll()
      res.status(200).json(languagesWords)
    } catch (err) {
      next(err)
    }
  },

  async getById (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      const languagesWord = await languageWordService.getById(id)
      res.status(200).json(languagesWord)
    } catch (err) {
      next(err)
    }
  },

  async getByName (req, res, next) {
    try {
      const { name } = NameParamSchema.parse({ name: req.params.name })
      const languagesWord = await languageWordService.getByName(name)
      res.status(200).json(languagesWord)
    } catch (err) {
      next(err)
    }
  },

  async create (req, res, next) {
    try {
      const data = LanguageWordCreateSchema.parse(req.body)
      const newLanguageWord = await languageWordService.create(data)
      res.status(201).json(newLanguageWord)
    } catch (err) {
      next(err)
    }
  },

  async update (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      const data = LanguageWordUpdateSchema.parse(req.body)
      const updated = await languageWordService.update(id, data)
      res.status(200).json(updated)
    } catch (err) {
      next(err)
    }
  },

  async remove (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      await languageWordService.remove(id)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}
