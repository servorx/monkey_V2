import { TestRunCreateSchema, TestRunUpdateSchema } from '../schemas/test-run.schema.js'
import { IdParamSchema } from '../schemas/core/general.schema.js'
import { testRunService } from '../services/test-run.service.js'

export const testRunController = {
  async getAll (req, res, next) {
    try {
      const testRuns = await testRunService.getAll()
      res.status(200).json(testRuns)
    } catch (err) {
      next(err)
    }
  },

  async getById (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      const testRun = await testRunService.getById(id)
      res.status(200).json(testRun)
    } catch (err) {
      next(err)
    }
  },

  async getByUserAndLanguage (req, res, next) {
    try {
      // eslint-disable-next-line camelcase
      const { user_id, language_id } = IdParamSchema.parse({
        user_id: Number(req.params.user_id),
        language_id: Number(req.params.language_id)
      })
      const testRun = await testRunService.getByUserAndLanguage(user_id, language_id)
      res.status(200).json(testRun)
    } catch (err) {
      next(err)
    }
  },

  async create (req, res, next) {
    try {
      const data = TestRunCreateSchema.parse(req.body)
      const newTestRun = await testRunService.create(data)
      res.status(201).json(newTestRun)
    } catch (err) {
      next(err)
    }
  },

  async update (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      const data = TestRunUpdateSchema.parse(req.body)
      const updated = await testRunService.update(id, data)
      res.status(200).json(updated)
    } catch (err) {
      next(err)
    }
  },

  async remove (req, res, next) {
    try {
      const { id } = IdParamSchema.parse({ id: Number(req.params.id) })
      await testRunService.remove(id)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}
