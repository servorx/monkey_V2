import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/index.js'
// helper instance
import prismaClient from '../repositories/prisma/prismaClient.js'

// middleware para proteger rutas con JWT
export async function jwtAuth(req, res, next) {
  // el auth header debe estar presente para saber si esta autenticado
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) {
    // en caso de no estar autenticado, redirigir a la ruta de login con el error 401
    return res.status(401).json({ message: 'Unauthorized' })
  }

  // extraer token
  const token = auth.split(' ')[1]
  try {
    // verificar token con la clave secreta
    const payload = jwt.verify(token, JWT_SECRET)
    // agregar info del usuario al request para poder acceder a la rutas protegidas
    const user = await prismaClient.user.findUnique({ where: { id: payload.sub } })
    if (!user) {
      // si el usuario no existe, redirigir a la ruta de login con el error 401
      return res.status(401).json({ message: 'Unauthorized' })
    } 
    // pide a la ruta que se está ejecutando que agregue el usuario al request
    // TODO: revisar si los datos que se pasan son los correctos
    req.user = { id: user.id, username: user.username }
    next()
  } catch (err) {
    // en caso de error, redirigir a la ruta de login con el error 401
    return res.status(401).json({ message: 'Invalid token' })
  }
}
