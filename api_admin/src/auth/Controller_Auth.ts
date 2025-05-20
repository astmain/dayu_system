import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// import util from '../util/index.js';
import util from '../util/index.js';


import {Public} from "./public.decorator";
import Service_auth from "./Service_auth";
import User_service from "../admin_user/User_service";
import {Dto_user} from "./Dto_user";
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";


// http://127.0.0.1:3000/user/index

@ApiTags('权限管理')
@ApiBearerAuth('Authorization')
@Controller("auth")
export default class Controller_Auth {
    constructor(
        private readonly auth_service: Service_auth,
        private readonly user_service: User_service,
    ) {
    }


    @ApiOperation({summary: '登陆账号'})
    @ApiBody({type: Dto_user})
    @UseFilters(new HttpExceptionFilter())
    @Public()
    @Post("/login")
    async login(@Body() dto_user: Dto_user) {
        return util.R.wrapper_response(this.auth_service.login(dto_user.username, dto_user.password), "登陆成功")
        // return this.auth_service.login(dto_user.username, dto_user.password)
        //     .then(data => util.R.ok({msg: "登陆成功", data: data}))
        //     .catch(err => util.R.err({msg: "登陆失败", data: err}))


        // console.log(`login---body:`, dto_user)
        // let user = await this.auth_service.login(dto_user.username, dto_user.password)
        // console.log(`login---user:`, user)
        // if (user?.password === dto_user.password) {
        //     let result = {code: 200, msg: '成功/login', result: user};
        //     console.log(`login---result1:`, result)
        //     return result
        // } else {
        //     let result = {code: 200, msg: '失败/login', result: {}};
        //     console.log(`login---result2:`, result)
        //     return result
        // }
    }

    @ApiOperation({summary: '得到权限列表'})
    @Get("/list")
    list(): Object {
        return {code: 200, msg: '成功/index', result: 111};
    }

    @Get("/add")
    @ApiOperation({summary: '添加权限'})
    add(): Object {
        return {code: 200, msg: '成功/index', result: 111};
    }


    @Get("/update")
    @ApiOperation({summary: '更新权限'})
    update(): Object {
        return {code: 200, msg: '成功/index', result: 111};
    }

    @Get("/delete")
    @ApiOperation({summary: '删除权限'})
    delete(): Object {
        return {code: 200, msg: '成功/index', result: 111};
    }


    @ApiOperation({summary: 'index'})
    @Get("/index")
    index(@Param("id") id: number): Object {
        return {code: 200, msg: '成功/index', result: 111};
    }

}
