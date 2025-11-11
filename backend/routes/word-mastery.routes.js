import express from 'express'
import { wordMasteryController } from '../controllers/word-mastery.controller.js'

export const router = express.Router()

router.get('/:user_id/word/:word_id', wordMasteryController.getByUser)
router.get('/:user_id/word/:word_id', wordMasteryController.getByUserAndWord)
router.post('/', wordMasteryController.create)
router.patch('/:user_id/word/:word_id', wordMasteryController.update)
router.delete('/:user_id/word/:word_id', wordMasteryController.remove)
