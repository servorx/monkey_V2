import { Router } from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import { registerUserSchema } from '../schemas/auth/user.schema.js'

const router = Router()

router.post('/register', validateSchema(registerUserSchema), async (req, res) => {
  // si llega hasta aca con el validador de schema, es que el usuario es válido
  // TODO: saber que es context y que es lo que se pasa a la función
  // TODO: saber que es user y que es lo que se pasa a la función
  const user = await req.context.user.register(req.body)
  res.status(201).json(user)
})
