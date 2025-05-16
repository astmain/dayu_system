import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query, UnauthorizedException, UsePipes, ValidationPipe} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import {JwtService} from "@nestjs/jwt";
import util from "../util/index";
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";
import * as md5 from "md5";
import {PrismaClient} from "@prisma/client";
import {Qgetform} from "../util/Qgetform";
import tool from "../tool";


let db = new PrismaClient()


@ApiTags('权限管理')
@ApiBearerAuth('Authorization')
@Controller("auth")
export class auth {
    constructor(
        private jwt_service: JwtService,
    ) {
    }


    @tool.Dec_public()
    @UseFilters(new HttpExceptionFilter())
    @Qgetform("/login", "登陆", [{desc: "电话", key: 'tel', val: "111", type: String, required: true}, {desc: "密码", key: 'password', val: "123456", type: String, required: true}],)
    async login(@Query() form) {
        console.log(`login---tel:`, form)
        // 1.查询用户校验密码
        let user = await db.tb_user.findUnique({where: {tel: form.tel}})
        console.log(`111---user:`, user)
        let md5_password = md5(form.password).toUpperCase()
        console.log(`login---md5_password:`, md5_password) //todo 数据库密码方案使用md5加密
        if (user?.password !== form.password) {
            throw new UnauthorizedException()
        }

        // 2.生成token
        const payload = {username: user?.username, id: user?.id};
        const token = await this.jwt_service.signAsync(payload)
        console.log(`生成token:`, token)


        let tb_menu = await db.tb_menu.findMany()
        console.log(`111---tb_menu:`, tb_menu)

        const menus_tree = tool.build_tree({ arr: tb_menu, key_id: 'id', key_parent: 'parent_id' })
        // build_tree({ arr: tb_depart, key_id: 'depart_id', key_parent: 'parent_id' })

        let result = {...user, token, menus_tree}
        // console.log(`111---result:`, result)
        return {code: 200, msg: '成功/login', result};
    }

    @ApiOperation({summary: 'admin_super'})
    @UseFilters(new HttpExceptionFilter())
    @Get("/admin_super")
    async admin_super() {
        let user_list = await db.tb_user.findMany()
        return tool.R.ok({msg: "成功", result: user_list})
    }


    @tool.Dec_public()
    //我想把 Get 和ApiQuery 封装成一个装饰器
    @ApiQuery({name: 'tel', default: "111", type: String})
    @ApiQuery({name: 'password', default: "111", type: String})
    @Get("/test")
    async test(@Query() form) {
        console.log(`111---tel:`, form)
        return tool.R.ok({msg: "成功", result: form})
    }

    @tool.Dec_public()
    @Qgetform("测试2", "/test2", [{desc: "电话", key: 'tel', val: "111", type: String, required: true}, {desc: "密码", key: 'password', val: "123456", type: String, required: true}])
    async test2(@Query() form) {
        console.log(`form`, form)
        return tool.R.ok({msg: "成功", result: form})
    }


}
