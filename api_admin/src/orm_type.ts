import {TypeOrmModule} from "@nestjs/typeorm"
// let {TypeOrmModule} = require("@nestjs/typeorm")

import {admin_user} from "./admin_user/user.entity"


let orm = TypeOrmModule.forRoot({
    type: "mysql",
    host: '103.119.2.223',
    port: 3303,
    username: 'root',
    password: '123456',
    database: 'my_db',
    // entities: [admin_user],
    autoLoadEntities: true,//自动价值entities
    // synchronize: true,
    // logging: true,
})


export default orm

// console.log(`res---222:`, res)