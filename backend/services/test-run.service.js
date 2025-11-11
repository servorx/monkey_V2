import { testRunRepository } from '../repositories/test-run.repository'

export const testRunService = {
  async getAllTestRuns () {
    return testRunRepository.findAll()
  },

  async getTestRunById (id) {
    const testRun = await testRunRepository.findById(id)
    if (!testRun) throw new Error('Test run not found')
    return testRun
  },

  async createTestRun (data) {
    const existing = await testRunRepository.findByUserId(data.user_id)
    if (existing) throw new Error('Test run already in use')
    return testRunRepository.create(data)
  },

  async updateTestRun (id, data) {
    return testRunRepository.update(id, data)
  },

  async deleteTestRun (id) {
    return testRunRepository.delete(id)
  }
}
