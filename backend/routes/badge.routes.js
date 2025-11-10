import express from 'express'
import { badgeController } from '../controllers/badge/badge.controller.js'

export const router = express.Router()

router.get('/', badgeController.getAll)
router.get('/:id', badgeController.getById)
router.post('/', badgeController.create)
router.patch('/:id', badgeController.update)
router.delete('/:id', badgeController.remove)
