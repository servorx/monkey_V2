import express from 'express'
import { userSettingController } from '../controllers/user-settings.controller.js'

export const router = express.Router()

router.get('/:user_id', userSettingController.getByUserId)
router.post('/', userSettingController.create)
router.patch('/:user_id', userSettingController.update)
router.delete('/:user_id', userSettingController.remove)
