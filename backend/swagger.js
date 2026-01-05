import swaggerAutogen from 'swagger-autogen'

const swaggerAutogenInstance = swaggerAutogen()

// eslint-disable-next-line no-unused-vars
const doc = {
  info: {
    title: 'API de Monkeytype',
    description: 'Documentación de la API para la gestión del sistema Monkeytype 🐒'
  },
  host: 'localhost:4000',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],

  tags: [
    // 🔐 AUTH / SECURITY
    { name: 'Auth', description: 'Autenticación y JWT' },
    { name: 'Refresh Tokens', description: 'Gestión de refresh tokens' },
    { name: 'Roles', description: 'Gestión de roles del sistema' },
    { name: 'Users', description: 'Gestión de usuarios' },
    { name: 'User Roles', description: 'Relación usuarios ↔ roles' },

    // 📦 CORE ENTITIES
    { name: 'Words', description: 'Palabras del sistema' },
    { name: 'Languages', description: 'Idiomas disponibles' },
    { name: 'Language Words', description: 'Relación idiomas ↔ palabras' },

    // 📊 STATS & TESTS
    { name: 'Test Runs', description: 'Ejecuciones de pruebas de tipeo' },
    { name: 'Word Mastery', description: 'Dominio del usuario sobre palabras' },
    { name: 'Leaderboard Time Frames', description: 'Marcos de tiempo del leaderboard' },
    { name: 'Leaderboard Entries', description: 'Entradas del leaderboard' },

    // 🏆 BADGES & SETTINGS
    { name: 'Badges', description: 'Badges del sistema' },
    { name: 'User Badges', description: 'Badges obtenidos por el usuario' },
    { name: 'User Settings', description: 'Configuración del usuario' },
    { name: 'User Words', description: 'Palabras personalizadas del usuario' }
  ]
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./app.js']

swaggerAutogenInstance(outputFile, endpointsFiles).then(() => {
  console.log('✅ Swagger JSON generado correctamente.')
})
