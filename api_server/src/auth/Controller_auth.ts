import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
import {Service_auth} from "./Service_auth";
import util from "../util/index";
import {Public} from "./public.decorator";
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";
import {Dto_user} from "./Dto_user";


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
    @Public()
    @Get("/login")
    async login(@Query("username") username: string, @Query("password",) password: string) {
        console.log(`111---222:`, 333)
        return util.R.wrapper_response(this.service_auth.login(username, password), "登陆成功")
    }


    @ApiOperation({summary: '登陆2'})
    @ApiBody({type: Dto_user})
    @UseFilters(new HttpExceptionFilter())
    @Public()
    @Post("/login2")
    async login2(@Body() data: Dto_user) {
        return util.R.wrapper_response(this.service_auth.login(data.username, data.password), "登陆成功")
    }


}
