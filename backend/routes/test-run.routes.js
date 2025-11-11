import express from 'express'
import { testRunController } from '../controllers/test-run.controller.js'

export const router = express.Router()

router.get('/', testRunController.getAll)
router.get('/:id', testRunController.getById)
router.get('/:user_id/language/:language_id', testRunController.getByUserAndLanguage)
router.post('/', testRunController.create)
router.patch('/:id', testRunController.update)
router.delete('/:id', testRunController.remove)
