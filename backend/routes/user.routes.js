import express from 'express'
import { userController } from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/jwt-auth.middleware.js'

const router = express.Router()

router.post('/register', userController.register)
router.get('/profile', verifyToken, userController.profile)
router.put('/profile', verifyToken, userController.updateProfile)
// router.get

export default router
