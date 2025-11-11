import { AppError } from '../utils/errors.js'

// middleware para manejar errores globales
export function globalErrorHandler (err, req, res, next) {
  console.error(`[ERROR] ${err.message}`)

  // si el error es de tipo AppError, devolver el error con el statusCode y el mensaje
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details ?? null
    })
  }
  // errores con zod
  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid request data',
      // o err.errors
      details: err.issues
    })
  }
  // si no es de tipo AppError, devolver el error con el statusCode 500 por defecto
  return res.status(500).json({
    success: false,
    message: 'Internal server error'
  })
}
