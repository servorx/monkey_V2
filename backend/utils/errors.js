// este fichero tiene como funcionalidad principal la creación de errores personalizados
// esta es la clase pricepara crear errores personalizados que hereda directamente de Error
export class AppError extends Error {
  constructor (message, statusCode = 500, details = null, code = 'APP_ERROR') {
    super(message)
    this.statusCode = statusCode
    this.details = details
    this.code = code
    Error.captureStackTrace(this, this.constructor)
  }
}

// AUTH
// 401 — El usuario no está autenticado
export class AuthError extends AppError {
  constructor (message = 'Authentication failed', details = null) {
    super(message, 401, details, 'AUTH_ERROR')
  }
}

// 403 — Usuario autenticado pero sin permisos suficientes
export class ForbiddenError extends AppError {
  constructor (message = 'Access denied', details = null) {
    super(message, 403, details, 'FORBIDDEN')
  }
}

// 498 — Token inválido o expirado (custom)
export class InvalidTokenError extends AppError {
  constructor (message = 'Invalid or expired token', details = null) {
    super(message, 498, details, 'INVALID_TOKEN')
  }
}

// validation
// 400 — Datos de entrada no válidos
export class ValidationError extends AppError {
  constructor (message = 'Validation failed', details = null) {
    super(message, 400, details, 'VALIDATION_ERROR')
  }
}

// 405 — metodo no permitido
export class InvalidDataError extends AppError {
  constructor (message = 'Invalid data', details = null) {
    super(message, 405, details, 'INVALID_DATA')
  }
}

// 406 — Datos no aceptables
export class NotAcceptableError extends AppError {
  constructor (message = 'Not acceptable', details = null) {
    super(message, 406, details, 'NOT_ACCEPTABLE')
  }
}

// 422 — Datos bien formados pero lógicamente inválidos
export class UnprocessableEntityError extends AppError {
  constructor (message = 'Unprocessable entity', details = null) {
    super(message, 422, details, 'UNPROCESSABLE_ENTITY')
  }
}

// errores de bases de datos
// 500 — Error en base de datos
export class DatabaseError extends AppError {
  constructor (message = 'Database operation failed', details = null) {
    super(message, 500, details, 'DATABASE_ERROR')
  }
}

// 409 — Conflicto (ej. registro duplicado)
export class ConflictError extends AppError {
  constructor (message = 'Resource conflict', details = null) {
    super(message, 409, details, 'CONFLICT')
  }
}

// culpa del frontend
// 404 — Recurso no encontrado
export class NotFoundError extends AppError {
  constructor (resource = 'Resource', details = null) {
    super(`${resource} not found`, 404, details, 'NOT_FOUND')
  }
}

// 408 — Timeout o servicio externo lento
export class TimeoutError extends AppError {
  constructor (message = 'Request timeout', details = null) {
    super(message, 408, details, 'TIMEOUT')
  }
}

// culpa del backend
// 502 — Error en un servicio externo (API, microservicio, etc.)
export class ExternalServiceError extends AppError {
  constructor (message = 'External service error', details = null) {
    super(message, 502, details, 'EXTERNAL_SERVICE')
  }
}

// 429 — Límite de peticiones excedido (Rate limiting)
export class TooManyRequestsError extends AppError {
  constructor (message = 'Too many requests', details = null) {
    super(message, 429, details, 'TOO_MANY_REQUESTS')
  }
}

// 503 — Servicio no disponible temporalmente
export class ServiceUnavailableError extends AppError {
  constructor (message = 'Service temporarily unavailable', details = null) {
    super(message, 503, details, 'SERVICE_UNAVAILABLE')
  }
}

// 415 — Tipo de contenido no soportado
export class UnsupportedMediaTypeError extends AppError {
  constructor (message = 'Unsupported media type', details = null) {
    super(message, 415, details, 'UNSUPPORTED_MEDIA_TYPE')
  }
}

// 400 — Error genérico de request malformado
export class BadRequestError extends AppError {
  constructor (message = 'Bad request', details = null) {
    super(message, 400, details, 'BAD_REQUEST')
  }
}

// teapot
export class TeapotError extends AppError {
  constructor (message = 'I am a teapot', details = null) {
    super(message, 418, details, 'TEAPOT')
  }
}

// 599 error de network connection timeout
export class NetworkError extends AppError {
  constructor (message = 'Network connection timeout', details = null) {
    super(message, 599, details, 'NETWORK_ERROR')
  }
}
