import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import * as md5 from "md5";
import {JwtService} from "@nestjs/jwt";


import {PrismaClient} from '@prisma/client';

let db = new PrismaClient()


@Injectable()
export class Service_auth {
    constructor(
        private jwt_service: JwtService,
    ) {
    }

    async login(username, password) {
        // let result = await db.tb_user.findUnique({where: {username: username}})
        // console.log(`login---result:`, result)
        // return {aaa: 1111}
        //

        console.log(`login---username:`, username, password)
        let user = await db.tb_user.findUnique({where: {username: username}})
        let md5_password = md5(password).toUpperCase()
        console.log(`login---md5_password:`, md5_password) //todo 数据库密码方案使用md5加密
        if (user?.password !== password) {
            throw new UnauthorizedException()
        }

        const payload = {username: user?.username, id: user?.id, role: user?.role};
        const token = await this.jwt_service.signAsync(payload)
        return {...user, token}


    }

}
