import { AuthService } from '../../services/auth/auth.service.js'
import { z } from 'zod'

export async function register (req, res, next) {
  try {
    const schema = z.object({
      username: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6)
    })
    const data = schema.parse(req.body)
    const user = await AuthService.register(data)
    res.status(201).json({ success: true, user: { id: user.id, username: user.username, email: user.email } })
  } catch (err) {
    next(err)
  }
}

export async function login (req, res, next) {
  try {
    const schema = z.object({
      email: z.string().email(),
      password: z.string()
    })
    const data = schema.parse(req.body)
    const result = await AuthService.login(data)
    res.json({ success: true, ...result })
  } catch (err) {
    next(err)
  }
}
