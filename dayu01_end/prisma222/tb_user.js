const {PrismaClient} = require("@prisma/client")
const path = require("path")
let table = 'tb_user'
let db = new PrismaClient()
// console.log(`111---db:`,     db        )
let tb = db[table]
let tb_user = class {
    static async find_all() {
        // let list = await tb.findMany({orderBy: {order: 'asc'}})  //asc从小到大  desc从大到小
        console.log(`111---tb:`,     tb        )
        let list = await tb.findMany()  //asc从小到大  desc从大到小
        console.log(`tb_account---find_all:`, list)
        return list
    }


}
module.exports = tb_user
// export default  tb_user
tb_user.find_all()
// tb_user.save_one()