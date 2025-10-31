// routes/userRoutes.js
import express from 'express'
import { z } from 'zod'

const router = express.Router()

const createUserSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('El correo electrónico no es válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export default router
