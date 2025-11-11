import express from 'express'
import { languageController } from '../controllers/language.controller.js'

export const router = express.Router()

router.get('/', languageController.getAll)
router.get('/:id', languageController.getById)
router.get('/:name', languageController.getByName)
router.post('/', languageController.create)
router.patch('/:id', languageController.update)
router.delete('/:id', languageController.remove)

export default router
