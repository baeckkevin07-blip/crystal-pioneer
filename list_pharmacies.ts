import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const pharmacies = await prisma.pharmacy.findMany()
    console.log(JSON.stringify(pharmacies, null, 2))
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
