import express from 'express'
import { leaderboardEntryTimeFrameController } from '../controllers/leaderboard-entry-time-frame.controller.js'

export const router = express.Router()

router.get('/', leaderboardEntryTimeFrameController.getAll)
router.get('/:id', leaderboardEntryTimeFrameController.getById)
router.get('/:name', leaderboardEntryTimeFrameController.getByName)
router.post('/', leaderboardEntryTimeFrameController.create)
router.patch('/:id', leaderboardEntryTimeFrameController.update)
router.delete('/:id', leaderboardEntryTimeFrameController.remove)
