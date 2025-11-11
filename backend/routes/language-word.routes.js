import express from 'express'
import { languageWordController } from '../controllers/language-word.controller.js'

export const router = express.Router()

router.get('/', languageWordController.getAll)
router.get('/:id', languageWordController.getById)
router.get('/:name', languageWordController.getByName)
router.post('/', languageWordController.create)
router.patch('/:id', languageWordController.update)
router.delete('/:id', languageWordController.remove)
