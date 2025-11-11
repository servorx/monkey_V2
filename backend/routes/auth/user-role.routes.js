import express from 'express'
import { userRoleController } from '../../controllers/auth/user-role.controller.js'

export const router = express.Router()

router.get('/', userRoleController.getAll)
router.get('/:id', userRoleController.getById)
router.post('/', userRoleController.create)
router.patch('/:id', userRoleController.update)
router.delete('/:id', userRoleController.remove)

export default router
