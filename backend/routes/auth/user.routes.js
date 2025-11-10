import express from 'express'
import { userController } from '../../controllers/auth/user.controller.js'

export const router = express.Router()

router.get('/', userController.getAll)
router.get('/:id', userController.getById)
router.post('/', userController.create)
router.patch('/:id', userController.update)
router.delete('/:id', userController.remove)
