// src/app.js
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { readFileSync } from 'node:fs'

// Middlewares
import { rateLimiter } from './middlewares/rate-limit.middleware.js'
import { corsOptions } from './middlewares/cors.middleware.js'
import { validationErrorHandler } from './middlewares/validation-error-handler.middleware.js'

// Rutas principales
import routes from './routes/index.js'

// Configurar variables de entorno
dotenv.config()

const app = express()

export function CreateApp () {
  app.disable('x-powered-by')
  app.use(cors(corsOptions))
  app.use(express.json())
  app.use(morgan('dev'))
  app.use(rateLimiter)

  // 📘 Swagger
  const swaggerFile = JSON.parse(readFileSync(new URL('./swagger_output.json', import.meta.url)))
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

  // 📦 Rutas principales
  app.use('/api/v1', routes)

  // Middleware de validaciones (Zod)
  app.use(validationErrorHandler)

  // Ruta base de prueba
  app.get('/', (_, res) => res.send('holaaaaa el api funciona'))

  const port = process.env.PORT ?? 3000
  app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`))
}
