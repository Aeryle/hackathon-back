const { PrismaClient } = require('@prisma/client')
const { boss } = require('../src/routes')
const prisma = new PrismaClient()

async function main() {
const res = await prisma.boss.createMany({
    data: [
        {
            name: "Shriekwing",
            description: "He got wings",
            image: "https://google.com",
        },
        {
            name: "Altimor",
            description: "He got doggos",
            image: "https://google.com"
        },
        {
            name: "Sun King Salvation",
            description: "He's in fire'",
            image: "https://google.com"
        },
    ]
})

console.log(res);

// await prisma.phase.create({
//     data: {
//         name: "Soif de sang",
//         strategy:"Il est tres assoife",
//         boss: {
//             connect : {
//                 id:
//             }
//         }
//     }
// })

}


main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
