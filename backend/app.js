// imports directos de librerias
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
// esto es para leer el json importado
import { readFileSync } from 'node:fs'
import swaggerUi from 'swagger-ui-express'
// import de middlewares
import { rateLimiter } from './middlewares/rate-Limit.middleware.js'
import { corsOptions } from './middlewares/cors.middleware.js'
import { validationErrorHandler } from './middlewares/validation-error-handler.middleware.js'

// importar swagger
const swaggerFile = JSON.parse(readFileSync(new URL('./swagger_output.json', import.meta.url)))

// cargar variables de entorno
dotenv.config()

// const prisma = new PrismaClient()

const app = express()

export function CreateApp () {
  // desabilitar el bloque de seguridad de express
  app.disable('x-powered-by')
  // middleware de cors
  app.use(cors(corsOptions))
  // esto es para parsear el body como json
  app.use(express.json())
  // log de requests
  app.use(morgan('dev'))
  // middleware de validacion de errores
  app.use(validationErrorHandler)
  // app.use('/api/v1/auth', require('./routes/auth'))
  // app.use('/api/v1/users', require('./routes/users'))

  app.use(rateLimiter)

  // ruta de la api principal
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  // Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

  const port = process.env.PORT ?? 3000

  app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
  })
}

// import express from 'express'
// import morgan from 'morgan'
// import helmet from 'helmet'
// import swaggerUi from 'swagger-ui-express'
// import swaggerSpec from '../swagger.js' // export swagger spec
// import cors from 'cors'
// import { corsOptions } from './middlewares/cors.js'
// import { rateLimiter } from './middlewares/rateLimit.js'
// import { validationErrorHandler } from './middlewares/validationErrorHandler.js'
// import { errorHandler } from './middlewares/errorHandler.js'
// import routes from './routes/index.js'

// const app = express()

// app.disable('x-powered-by')
// app.use(helmet())
// app.use(cors(corsOptions))
// app.use(express.json())
// app.use(morgan('dev'))
// app.use(rateLimiter)

// // routes
// app.use('/api', routes)

// // swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// // validation errors (Zod)
// app.use(validationErrorHandler)

// // generic error handler (last)
// app.use(errorHandler)

// export default app
