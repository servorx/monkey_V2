// importa el cliente de Prisma
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
// genera una instancia de PrismaClient para poder trabajar en el codigo
const prisma = new PrismaClient()

// funcion para generar un hash de contraseña en los seeders
function hashedPassword (password) {
  return bcrypt.hashSync(password, 10)
}

// funcion principal para generar seeder de datos iniciales
async function main () {
  // genera multiples inserts en la base de datos de forma constante
  await prisma.role.createMany({
    data: [
      { role_name: 'admin', description: 'Full system access' },
      { role_name: 'user', description: 'Regular user with basic permissions' },
      { role_name: 'guest', description: 'Unregistered limited user' }
    ]
    // TODO: revisar si hace falta colocarl skitDuplicates en los arrays
  })

  await prisma.user.createMany({
    data: [
      {
        username: 'admin',
        email: 'admin@monkey.com',
        password: hashedPassword('admin123'),
        preferred_language: 'en'
      },
      {
        username: 'testuser',
        email: 'user@monkey.com',
        password: hashedPassword('user123'),
        preferred_language: 'es'
      }
    ]
  })

  await prisma.userRole.createMany({
    data: [
      { user_id: 1, role_id: 1 }, // admin -> ADMIN
      { user_id: 2, role_id: 2 } // testuser -> USER
    ]
  })

  await prisma.userSettings.createMany({
    data: [
      {
        user_id: 1,
        theme_name: 'dark',
        font_name: 'Roboto Mono',
        test_options: JSON.stringify({ timeLimit: 60, language: 'en' })
      },
      {
        user_id: 2,
        theme_name: 'vscore',
        font_name: 'Fira Code',
        test_options: JSON.stringify({ timeLimit: 30, language: 'es' })
      }
    ]
  })

  await prisma.language.createMany({
    data: [
      { name: 'English', description: 'Default typing test language' },
      { name: 'Español', description: 'Spanish language test set' },
      { name: 'Français', description: 'French language test set' }
    ]
  })

  await prisma.leaderboardEntryTimeFrame.createMany({
    data: [
      { time_frame: 'daily' },
      { time_frame: 'weekly' },
      { time_frame: 'monthly' },
      { time_frame: 'all_time' }
    ]
  })

  await prisma.badge.createMany({
    data: [
      {
        name: 'First Test',
        description: 'Complete your first typing test',
        icon_url: '/assets/badges/first_test.png',
        min_score: 10
      },
      {
        name: 'Speed Demon',
        description: 'Reach 100 WPM in any test',
        icon_url: '/assets/badges/speed_demon.png',
        min_score: 100
      },
      {
        name: 'Consistency King',
        description: 'Maintain 95% accuracy over 10 tests',
        icon_url: '/assets/badges/consistency_king.png',
        min_score: 95
      }
    ]
  })

  await prisma.userBadge.createMany({
    data: [
      { user_id: 1, badge_id: 1 },
      { user_id: 2, badge_id: 2 }
    ]
  })

  // TODO: tengo que mejorar todos los seeders de test runs y leaderboard entries
  // await prisma.leaderboardEntry.createMany({
  //   data: [
  //     { user_id: 1, test_run_id: 1, time_frame_id: 4 },
  //     { user_id: 2, test_run_id: 2, time_frame_id: 4 },
  //   ],
  // });
}

// ejecuta la funcion main y maneja errores
main()
  .catch(e => {
    console.error(e)
    // si hay un error, se imprime el error y se cierra el proceso con el codigo 1
    process.exit(1)
  })
  // despues de cada ejecucion, se desconecta el cliente de prisma
  .finally(() => prisma.$disconnect())
