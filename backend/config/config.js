import dotenv from 'dotenv'
dotenv.config()

// este archivo de forma general es para configurar las variables de entorno e importarlas en l archivo necesario, para poder usar env solo una vez
export const PORT = process.env.PORT || 4000
// export const NODE_ENV = process.env.NODE_ENV || 'development'
export const DATABASE_URL = process.env.DATABASE_URL
export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY || 'llave-super-hiper-mega-secretisima-1234567890-kajajajajajaja-ekisde-1234567890'
export const JWT_EXPIRES_IN_MINUTES = process.env.JWT_EXPIRES_IN_MINUTES || 10
export const REFRESH_TOKEN_EXPIRES_DAYS = process.env.REFRESH_TOKEN_EXPIRES_DAYS || 30
export const SALT_ROUNDS = process.env.SALT_ROUNDS || 10
export const CORS_ORIGIN = process.env.CORS_ORIGIN || '*'
export const RATE_LIMIT_WINDOW_MS = process.env.RATE_LIMIT_WINDOW_MS || 10 * 60 * 1000 // 10 minutes
export const RATE_LIMIT_MAX_REQUESTS = process.env.RATE_LIMIT_MAX_REQUESTS || 100 // limitar el ip a 100 requests por ventana de tiempo
