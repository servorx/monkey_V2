import express from 'express'
import { wordController } from '../controllers/word.controller.js'

export const router = express.Router()

router.get('/', wordController.getAll)
router.get('/:id', wordController.getById)
router.get('/:name', wordController.getByName)
router.post('/', wordController.create)
router.patch('/:id', wordController.update)
router.delete('/:id', wordController.remove)

export default router
