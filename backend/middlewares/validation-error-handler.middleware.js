// esto es para manejar errores de validación usando Zod
export function validationErrorHandler (err, req, res, next) {
  if (err.name === 'ZodError') {
    const errors = err.errors.map((e) => e.message)

    return res.status(400).json({
      success: false,
      errors
    })
  }

  // si no es un error de validacion se pasa al siguiente middleware de manejo de errores
  return next(err)
}
