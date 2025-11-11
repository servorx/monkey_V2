import { Router } from 'express'
import { wordController } from '../controllers/word.controller.js'

const router = Router()

router.get('/', wordController.getAll)
router.get('/:id', wordController.getById)
router.get('/:name', wordController.getByName)
router.post('/', wordController.create)
router.put('/:id', wordController.update)
router.delete('/:id', wordController.remove)

export default router
