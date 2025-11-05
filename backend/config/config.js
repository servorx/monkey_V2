import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 4000
// export const NODE_ENV = process.env.NODE_ENV || 'development'
export const DATABASE_URL = process.env.DATABASE_URL
export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY || 'llave-super-hiper-mega-secretisima-1234567890-kajajajajajaja-ekisde-1234567890'
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m'
export const REFRESH_TOKEN_EXPIRES_DAYS = process.env.REFRESH_TOKEN_EXPIRES_DAYS || 30
export const SALT_ROUNDS = process.env.SALT_ROUNDS || 10
export const CORS_ORIGIN = process.env.CORS_ORIGIN || '*'