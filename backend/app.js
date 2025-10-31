// imports directos de librerias
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
// import { PrismaClient } from '@prisma/client'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger_output.json' with { type: 'json' };

// import de middlewares
import { rateLimiter } from './middlewares/rateLimit.js'
import { corsOptions } from './middlewares/cors.js'

dotenv.config()

// const prisma = new PrismaClient()

const app = express()

export function CreateApp() {
  // desabilitar el bloque de seguridad de express
  app.disable('x-powered-by')
  app.use(cors(corsOptions))
  app.use(express.json())
  app.use(morgan('dev'))

  // app.use('/api/v1/auth', require('./routes/auth'))
  // app.use('/api/v1/users', require('./routes/users'))

  app.use(rateLimiter)

  // ruta de la api principal
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  // Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

  const port = process.env.PORT ?? 3000

  app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
  })
}