const { PrismaClient } = require("@prisma/client")
const path = require("path")
let table = 'tb_account'
let db = new PrismaClient()
let tb = db[table]
let tb_account = class {
    static async find_all() {
        // let list = await tb.findMany({orderBy: {order: 'asc'}})  //asc从小到大  desc从大到小
        let list = await tb.findMany()  //asc从小到大  desc从大到小
        console.log(`tb_account---find_all:`, list)
        return list
    }






}
module.exports = tb_account
// export default  tb_account

tb_account.find_all()
// tb_account.save_one()