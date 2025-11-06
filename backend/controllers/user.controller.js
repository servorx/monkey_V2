import { userService } from '../services/user.service.js'

export const userController = {
  async register (req, res, next) {
    try {
      const user = await userService.registerUser(req.body)
      res.status(201).json({ message: 'User created successfully', user })
    } catch (err) {
      next(err)
    }
  },

  async profile (req, res, next) {
    try {
      const user = await userService.getUserProfile(req.user.id)
      res.json(user)
    } catch (err) {
      next(err)
    }
  },

  async updateProfile (req, res, next) {
    try {
      const updated = await userService.updateProfile(req.user.id, req.body)
      res.json(updated)
    } catch (err) {
      next(err)
    }
  },

  async login (req, res, next) {
    try {
      const { email, password } = req.body
      const user = await userService.login(email, password)
      res.json(user)
    } catch (err) {
      next(err)
    }
  }
}
