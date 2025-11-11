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

// errores de tipo 400
// ====================
// 400 — Error genérico de request malformado
export class ValidationError extends AppError {
  constructor (message = 'Validation failed', details = null) {
    super(message, 400, details, 'VALIDATION_ERROR')
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

export class OperationNotAllowedError extends AppError {
  constructor (message = 'Operation not allowed', details = null) {
    super(message, 403, details, 'OPERATION_NOT_ALLOWED')
  }
}

// culpa del frontend
// 404 — Recurso no encontrado
export class NotFoundError extends AppError {
  constructor (resource = 'Resource', details = null) {
    super(`${resource} not found`, 404, details, 'NOT_FOUND')
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

// 408 — Timeout o servicio externo lento
export class TimeoutError extends AppError {
  constructor (message = 'Request timeout', details = null) {
    super(message, 408, details, 'TIMEOUT')
  }
}

// 409 — Conflicto (ej. registro duplicado)
export class ConflictError extends AppError {
  constructor (message = 'Resource conflict', details = null) {
    super(message, 409, details, 'CONFLICT')
  }
}

// 415 — Tipo de contenido no soportado
export class UnsupportedMediaTypeError extends AppError {
  constructor (message = 'Unsupported media type', details = null) {
    super(message, 415, details, 'UNSUPPORTED_MEDIA_TYPE')
  }
}

// teapot
export class TeapotError extends AppError {
  constructor (message = 'I am a teapot', details = null) {
    super(message, 418, details, 'TEAPOT')
  }
}

// 422 — Datos bien formados pero lógicamente inválidos
export class IntegrityError extends AppError {
  constructor (message = 'Data integrity violation', details = null) {
    super(message, 422, details, 'INTEGRITY_ERROR')
  }
}

// 424 - Failed dependency

export class DependencyError extends AppError {
  constructor (message = 'Dependency failed', details = null) {
    super(message, 424, details, 'DEPENDENCY_FAILED')
  }
}

// 426 - Update required
export class UpdateRequiredError extends AppError {
  constructor (message = 'Update required', details = null) {
    super(message, 426, details, 'UPDATE_REQUIRED')
  }
}

// 429 — Límite de peticiones excedido (Rate limiting)
export class TooManyRequestsError extends AppError {
  constructor (message = 'Too many requests', details = null) {
    super(message, 429, details, 'TOO_MANY_REQUESTS')
  }
}

// 444 - No Response
export class NoResponseError extends AppError {
  constructor (message = 'No response', details = null) {
    super(message, 444, details, 'NO_RESPONSE')
  }
}

// 498 — Token inválido o expirado (custom)
export class InvalidTokenError extends AppError {
  constructor (message = 'Invalid or expired token', details = null) {
    super(message, 498, details, 'INVALID_TOKEN')
  }
}

// errores de bases de datos
// 500 — Error en base de datos
export class DatabaseError extends AppError {
  constructor (message = 'Database operation failed', details = null) {
    super(message, 500, details, 'DATABASE_ERROR')
  }
}

// 501 — No implementado
export class NotImplementedError extends AppError {
  constructor (message = 'Not implemented', details = null) {
    super(message, 501, details, 'NOT_IMPLEMENTED')
  }
}

// culpa del backend
// 502 — Error en un servicio externo (API, microservicio, etc.)
export class ExternalServiceError extends AppError {
  constructor (message = 'External service error', details = null) {
    super(message, 502, details, 'EXTERNAL_SERVICE')
  }
}

// 503 — Servicio no disponible temporalmente
export class CacheError extends AppError {
  constructor (message = 'Cache service failed', details = null) {
    super(message, 503, details, 'CACHE_ERROR')
  }
}

// 504 — Gateway Timeout
export class GatewayTimeoutError extends AppError {
  constructor (message = 'Gateway timeout', details = null) {
    super(message, 504, details, 'GATEWAY_TIMEOUT')
  }
}

// 510 — Not extended
export class NotExtendedError extends AppError {
  constructor (message = 'Not extended', details = null) {
    super(message, 510, details, 'NOT_EXTENDED')
  }
}

// 599 error de network connection timeout
export class NetworkError extends AppError {
  constructor (message = 'Network connection timeout', details = null) {
    super(message, 599, details, 'NETWORK_ERROR')
  }
}
