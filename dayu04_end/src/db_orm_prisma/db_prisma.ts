import {Module, Global, DynamicModule} from '@nestjs/common';

import {PrismaClient} from '@prisma/client';
// const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
interface Opt {
    path: string
}
@Global()
@Module({
    //挂载模块
    imports: [],

    providers: [
        {provide: "db_prisma", useValue: {baseUrl: "/v1"}},
    ],
    exports: [
        {provide: "db_prisma", useValue: {baseUrl: "/v1"}},


    ],


})


export class db_prisma {

    static make_path(opt: Opt): DynamicModule {
        return {
            module: db_prisma,
            providers: [
                {provide: "db_prisma", useValue:prisma},
            ],
            // exports: [
            //     {provide: "__db_global", useValue: {baseUrl: "/v1" + opt.path}},
            // ],
        }

    }
}
