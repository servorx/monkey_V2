import { wordsService } from '../services/words.service.js'

export const wordController = {
  async getAllWords (req, res, next) {
    try {
      const words = await wordsService.getAllWords()
      res.json(words)
    } catch (err) {
      next(err)
    }
  },

  async getWordById (req, res, next) {
    try {
      const word = await wordsService.getWordById(req.params.id)
      res.json(word)
    } catch (err) {
      next(err)
    }
  },

  async createWord (req, res, next) {
    try {
      const word = await wordsService.createWord(req.body)
      res.status(201).json({ message: 'Word created successfully', word })
    } catch (err) {
      next(err)
    }
  },

  async updateWord (req, res, next) {
    try {
      const updated = await wordsService.updateWord(req.params.id, req.body)
      res.json(updated)
    } catch (err) {
      next(err)
    }
  },

  async deleteWord (req, res, next) {
    try {
      await wordsService.deleteWord(req.params.id)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}
