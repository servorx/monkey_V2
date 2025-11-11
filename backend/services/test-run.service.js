import { testRunRepository } from '../repositories/test-run.repository.js'
import {
  ValidationError,
  NotFoundError,
  IntegrityError,
  DatabaseError
} from '../utils/errors.js'

export const testRunService = {
  async getAll () {
    return testRunRepository.findAll()
  },

  async getById (id) {
    const run = await testRunRepository.findById(id)
    if (!run) throw new NotFoundError('Test run not found')
    return run
  },

  async create (data) {
    if (!data.user_id || !data.wpm || !data.mode_type || !data.mode_value) {
      throw new ValidationError('Missing required test run fields')
    }

    try {
      return await testRunRepository.create(data)
    } catch (err) {
      if (err.code === 'P2003') throw new IntegrityError('Invalid foreign key: user_id or language_id')
      throw new DatabaseError('Failed to create test run', err.message)
    }
  },

  async update (id, data) {
    const existing = await testRunRepository.findById(id)
    if (!existing) throw new NotFoundError('Test run not found')

    try {
      return await testRunRepository.update(id, data)
    } catch (err) {
      throw new DatabaseError('Failed to update test run', err.message)
    }
  },

  async remove (id) {
    const existing = await testRunRepository.findById(id)
    if (!existing) throw new NotFoundError('Test run not found')

    try {
      await testRunRepository.delete(id)
    } catch (err) {
      throw new DatabaseError('Failed to delete test run', err.message)
    }
  }
}
