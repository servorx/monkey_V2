import { LanguageWordCreateSchema, LanguageWordUpdateSchema } from '../schemas/language-word.schema'
import { IdParamSchema, NameParamSchema } from '../schemas/core/general.schema'
import { languageService } from '../services/language.service'

export const languageController = {
  async getAll (req, res, next) {
    try {
      const languages = await languageService.getAll()
      res.status(200).json(languages)
    } catch (err) {
      next(err)
    }
  },

  async getById (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      const languages = await languageService.getById(id)
      res.status(200).json(languages)
    } catch (err) {
      next(err)
    }
  },

  async getByName (req, res, next) {
    try {
      const { name } = NameParamSchema.parse({ name: req.params.name })
      const languages = await languageService.getByName(name)
      res.status(200).json(languages)
    } catch (err) {
      next(err)
    }
  },

  async create (req, res, next) {
    try {
      const data = LanguageWordCreateSchema.parse(req.body)
      const newLanguage = await languageService.create(data)
      res.status(201).json(newLanguage)
    } catch (err) {
      next(err)
    }
  },

  async update (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      const data = LanguageWordUpdateSchema.parse(req.body)
      const updated = await languageService.update(id, data)
      res.status(200).json(updated)
    } catch (err) {
      next(err)
    }
  },

  async remove (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      await languageService.remove(id)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}
