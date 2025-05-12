let {PrismaClient} = require("@prisma/client")
const db = new PrismaClient()

main()
async function main() {
    // await db.User.create({
    //     data: {
    //         email: 'alice@example.com',
    //         profile: {
    //             create: {
    //                 bio: 'Full-stack developer'
    //             }
    //         }
    //     }
    // });


    const userWithProfile = await db.User.findUnique({
        where: { id: 1 },
        include: { profile: true }
    });
    console.log(`111---userWithProfile:`,     userWithProfile        )


    const list1 = await db.User.findMany({
        where: { id: 1 },
        include: { profile: true }
    });
    console.log(`111---list`,     list1        )

    const list2 = await db.User.findMany();
    console.log(`111---list2`,     list2        )




}
