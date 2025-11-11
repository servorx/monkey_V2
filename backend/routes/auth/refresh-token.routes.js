import express from 'express'
import { refreshTokenController } from '../../controllers/auth/refresh-token.controller.js'

export const router = express.Router()

router.get('/', refreshTokenController.getAll)
router.get('/:id', refreshTokenController.getById)
router.post('/', refreshTokenController.create)
router.patch('/:id', refreshTokenController.update)
router.delete('/:id', refreshTokenController.remove)

export default router
