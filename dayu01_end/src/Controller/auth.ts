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
    @ApiQuery({name: 'tel', default: "111", type: String})
    @ApiQuery({name: 'password', default: "123456", type: String})
    @UseFilters(new HttpExceptionFilter())
    @util.Dec_public()
    @Get("/login")
    async login(@Query("tel") tel: string, @Query("password",) password: string) {
        console.log(`login---tel:`, tel, password)
        // 1.查询用户校验密码
        let user = await db.tb_user.findUnique({where: {tel: tel}})
        console.log(`111---user:`, user)
        let md5_password = md5(password).toUpperCase()
        console.log(`login---md5_password:`, md5_password) //todo 数据库密码方案使用md5加密
        if (user?.password !== password) {
            throw new UnauthorizedException()
        }

        // 2.生成token
        const payload = {username: user?.username, user_id: user?.user_id};
        const token = await this.jwt_service.signAsync(payload)
        console.log(`生成token:`, token)


        // console.log(`111---result:`, result)
        return {code: 200, msg: '成功/login', result: {user}};
    }

    @ApiOperation({summary: 'admin_super'})
    @UseFilters(new HttpExceptionFilter())
    @Get("/admin_super")
    async admin_super() {
        let user_list = await db.tb_user.findMany()
        return util.R.ok({msg: "成功", result: user_list})
    }


}
