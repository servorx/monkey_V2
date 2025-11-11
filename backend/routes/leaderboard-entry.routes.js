import express from 'express'
import { leaderboardEntryController } from '../controllers/leaderboard-entry.controller.js'

export const router = express.Router()

router.get('/', leaderboardEntryController.getAll)
router.get('/:id', leaderboardEntryController.getById)
router.get('/:user_id/time-frame/:time_frame_id', leaderboardEntryController.getByUserAndTimeFrame)
router.post('/', leaderboardEntryController.create)
router.patch('/:id', leaderboardEntryController.update)
router.delete('/:id', leaderboardEntryController.remove)

export default router
