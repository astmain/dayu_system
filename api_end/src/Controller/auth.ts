import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query, UnauthorizedException} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import {JwtService} from "@nestjs/jwt";
import * as md5 from "md5";
import util from "../util/index";
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";
import {PrismaClient} from "@prisma/client";

let db = new PrismaClient()


@ApiTags('权限管理')
@ApiBearerAuth('Authorization')
@Controller("auth")
export class auth {
    constructor(
        private jwt_service: JwtService,
    ) {
    }


    @ApiOperation({summary: '登陆'})
    @ApiQuery({name: 'tel', default: "15160315110", type: String})
    @ApiQuery({name: 'password', default: "123456", type: String})
    @UseFilters(new HttpExceptionFilter())
    @util.Dec_public()
    @Get("/login")
    async login(@Query("tel") tel: string, @Query("password",) password: string) {
        console.log(`login---tel:`, tel, password)
        // 1.查询用户校验密码
        let user = await db.tb_user.findUnique({where: {tel: tel}})
        console.log(`111---user:`,     user        )
        let md5_password = md5(password).toUpperCase()
        console.log(`login---md5_password:`, md5_password) //todo 数据库密码方案使用md5加密
        if (user?.password !== password) {
            throw new UnauthorizedException()
        }

        // 2.生成token
        const payload = {username: user?.username, id: user?.id};
        const token = await this.jwt_service.signAsync(payload)
        console.log(`生成token:`, token)


        // 数据库表
        let tb_role = await db.tb_role.findMany()
        let tb_menu = await db.tb_menu.findMany()
        let role_user = await db.role_user.findMany()
        let role_menu = await db.role_menu.findMany()
        // let menu_tree = util.make_menu_tree({username, tb_role, tb_menu, role_user, role_menu,})

        // 菜单数据-扁平结构
        const menus_flat = util.menu_get_menus_flat_by_user_id({tb_menu, role_user, role_menu, user_id: user.id})
        // console.log(`111---menus_flat:`, menus_flat)

        // 菜单数据-树状结构
        const menus_tree = util.menu_get_menus_tree({menus: menus_flat})
        console.log(`111---menus_tree:`, menus_tree)

        // 返回参数
        let result = {...user, token, menus_tree, menus_flat: menus_flat}
        // console.log(`111---result:`, result)
        return {code: 200, msg: '成功/login', result: result};
    }

    @ApiOperation({summary: 'admin_super'})
    @UseFilters(new HttpExceptionFilter())
    @Get("/admin_super")
    async admin_super() {
        let user_list = await db.tb_user.findMany()
        return util.R.ok({msg: "成功", result: user_list})
    }


}
