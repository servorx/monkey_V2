import express from 'express'
import { usersWordsController } from '../controllers/users-words.controller.js'

export const router = express.Router()

router.get('/', usersWordsController.getAll)
router.get('/:user_id/word/:word_id', usersWordsController.getByUserId)
router.get('/:user_id/word/:word_id', usersWordsController.getByUserAndWord)
router.post('/', usersWordsController.create)
router.patch('/:user_id/word/:word_id', usersWordsController.update)
router.delete('/:user_id/word/:word_id', usersWordsController.remove)
