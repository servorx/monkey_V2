import express from 'express'
import { userBadgeController } from '../controllers/user-badges.controller.js'

export const router = express.Router()

router.get('/', userBadgeController.getAll)
router.get('/:user_id/badge', userBadgeController.getByUserId)
router.get('/:user_id/badge/:badge_id', userBadgeController.getByUserAndBadge)
router.post('/', userBadgeController.create)
router.patch('/:user_id/badge/:badge_id', userBadgeController.update)
router.delete('/:user_id/badge/:badge_id', userBadgeController.remove)
