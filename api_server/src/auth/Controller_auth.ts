import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
import {Service_auth} from "./Service_auth";
import util from "../util/index";
import {Dec_public} from "./Dec_public";
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";
import {Dto_user} from "./Dto_user";
import {PrismaClient} from "@prisma/client";

let db = new PrismaClient()


@ApiTags('权限管理')
@ApiBearerAuth('Authorization')
@Controller("auth")
export class Controller_auth {
    constructor(private readonly service_auth: Service_auth) {
    }


    @ApiOperation({summary: '登陆'})
    @ApiQuery({name: 'username', default: "admin", type: String})
    @ApiQuery({name: 'password', default: "123456", type: String})
    @UseFilters(new HttpExceptionFilter())
    @Dec_public()
    @Get("/login")
    async login(@Query("username") username: string, @Query("password",) password: string) {
        return util.R.wrapper_response(this.service_auth.login(username, password), "登陆成功")
    }


    @ApiOperation({summary: '登陆2'})
    @ApiBody({type: Dto_user})
    @UseFilters(new HttpExceptionFilter())
    @Dec_public()
    @Post("/login2")
    async login2(@Body() data: Dto_user) {
        return util.R.wrapper_response(this.service_auth.login(data.username, data.password), "登陆成功")
    }


    @ApiOperation({summary: 'admin_super'})
    @UseFilters(new HttpExceptionFilter())
    @Get("/admin_super")
    async admin_super() {
        let user_list = await db.tb_user.findMany()
        return util.R.ok({msg: "成功", result: user_list})
    }


}
