import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { readFileSync } from 'node:fs'

// Middlewares
import { rateLimiter } from './middlewares/rate-limit.middleware.js'
import { corsMiddleware } from './middlewares/cors.middleware.js'
import { validationErrorHandler } from './middlewares/validation-error-handler.middleware.js'
import { globalErrorHandler } from './middlewares/error-handler.middleware.js'
// Rutas principales
import routes from './routes/index.js'

dotenv.config()

const app = express()

app.disable('x-powered-by')
app.use(corsMiddleware)
app.use(express.json())
app.use(morgan('dev'))
app.use(rateLimiter)

// 📘 Swagger
const swaggerFile = JSON.parse(readFileSync(new URL('./swagger_output.json', import.meta.url)))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// 📦 Rutas principales
app.use('/api/v1', routes)

// Middleware de errores
app.use(validationErrorHandler)
app.use(globalErrorHandler)

// Ruta base
app.get('/', (_, res) => res.send('🚀 API funcionando correctamente'))

export default app
