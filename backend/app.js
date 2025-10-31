// imports directos de librerias
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

// import de middlewares
import { rateLimiter } from './middlewares/rateLimit.js'
import { corsOptions } from './middlewares/cors.js'

dotenv.config()

const prisma = new PrismaClient()

const app = express()

export function CreateApp() {
  app.use(corsOptions)
  app.use(express.json())
  app.use(morgan('dev'))

  app.use('/api/v1/auth', require('./routes/auth'))
  app.use('/api/v1/users', require('./routes/users'))

  app.use(rateLimiter)

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
  })
}