import { Router } from 'express'
// Rutas de autenticacion
import authRoutes from './auth/auth.routes.js'
import refreshTokenRoutes from './auth/refresh-token.routes.js'
import roleRoutes from './auth/role.routes.js'
import userRoutes from './users/user.routes.js'
import userRoleRoutes from './auth/user-role.routes.js'
// rutas de las demas entidades
import badgeRoutes from './badges/badge.routes.js'
import languageRoutes from './badges/language.routes.js'
import languageWordsRoutes from './badges/language-words.routes.js'

// crear router principal
const router = Router()

// Agrupar las rutas bajo prefijos lógicos
// JWT
router.use('/auth', authRoutes)
router.use('/auth/refresh-token', refreshTokenRoutes)
router.use('/roles', roleRoutes)
router.use('/users', userRoutes)
router.use('/user-roles', userRoleRoutes)
// entidades
router.use('/badges', badgeRoutes)
router.use('/languages', languageRoutes)
router.use('/language-words', languageWordsRoutes)

export default router
