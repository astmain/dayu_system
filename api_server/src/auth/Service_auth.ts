import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import * as md5 from "md5";
import {JwtService} from "@nestjs/jwt";
import util from "../util/index";

import {PrismaClient} from '@prisma/client';

let db = new PrismaClient()


@Injectable()
export class Service_auth {
    constructor(
        private jwt_service: JwtService,
    ) {
    }

    async login(username, password) {
        console.log(`login---username:`, username, password)
        // 查询用户校验密码
        let user = await db.tb_user.findUnique({where: {username: username}})
        let md5_password = md5(password).toUpperCase()
        console.log(`login---md5_password:`, md5_password) //todo 数据库密码方案使用md5加密
        if (user?.password !== password) {
            throw new UnauthorizedException()
        }


        // 生成token
        const payload = {username: user?.username, id: user?.id, role: user?.role};
        const token = await this.jwt_service.signAsync(payload)
        console.log(`生成token:`, token)

        // 生成菜单树
        let tb_role = await db.tb_role.findMany()
        let tb_menu = await db.tb_menu.findMany()
        let role_user = await db.role_user.findMany()
        let role_menu = await db.role_menu.findMany()
        let menu_tree = util.make_menu_tree({username, tb_role, tb_menu, role_user, role_menu,})

        // 返回参数
        let result = {...user, token, menu_tree}
        console.log(`111---result:`, result)
        return result
    }

}

