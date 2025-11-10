import express from 'express'
import { roleController } from '../../controllers/auth/role.controller.js'

export const router = express.Router()

router.get('/', roleController.getAll)
router.get('/:id', roleController.getById)
router.post('/', roleController.create)
router.patch('/:id', roleController.update)
router.delete('/:id', roleController.remove)
