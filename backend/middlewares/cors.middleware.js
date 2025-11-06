import cors from 'cors'
import { CORS_ORIGIN } from '../config/config'

const corsOptions = {
  origin: CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
  optionSuccessStatus: 200
}

const corsMiddleware = cors(corsOptions)

export default corsMiddleware
