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
import leaderboardEntryTimeFrameRoutes from './leaderboard/time-frame.routes.js'
import leaderboardEntryRoutes from './leaderboard/entry.routes.js'
import testRunRoutes from './test-run.routes.js'
import userBadgeRoutes from './user-badges.routes.js'
import userSettingRoutes from './user-settings.routes.js'
import usersWordsRoutes from './user-words.routes.js'
import wordMasteryRoutes from './word-mastery.routes.js'
import wordRoutes from './words.routes.js'

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
router.use('/leaderboard-time-frames', leaderboardEntryTimeFrameRoutes)
router.use('/leaderboard-entries', leaderboardEntryRoutes)
router.use('/test-runs', testRunRoutes)
router.use('/user-badges', userBadgeRoutes)
router.use('/user-settings', userSettingRoutes)
router.use('/users-words', usersWordsRoutes)
router.use('/word-mastery', wordMasteryRoutes)
router.use('/words', wordRoutes)

export default router
