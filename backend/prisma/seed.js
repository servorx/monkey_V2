import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.role.createMany({
    data: [
      { rol_name: 'admin', description: 'Administrator' },
      { rol_name: 'user', description: 'Regular user' }
    ],
    skipDuplicates: true
  })
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
