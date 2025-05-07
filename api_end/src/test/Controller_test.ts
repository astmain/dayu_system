import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
import {Service_test} from "./Service_test";
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";
import {Dec_public} from "../auth/Dec_public";


// http://127.0.0.1:3000/user/index

@ApiTags('测试功能')
@ApiBearerAuth('Authorization')
@Controller("test")
export class Controller_test {
    constructor(private readonly service_auth: Service_test) {
    }

    @ApiOperation({summary: '得到数据'})
    @ApiQuery({name: 'username', default: "admin", type: String})
    @ApiQuery({name: 'password', default: "123456", type: String})
    @UseFilters(new HttpExceptionFilter())
    @Dec_public()
    @Get("/login")
    async get(@Query("username") username: string, @Query("password",) password: string) {
        return {code: 200, msg: '成功/get', result: 111};
    }


    @ApiOperation({summary: '得到列表'})
    @Get("/list")
     list(): Object {
        return {code: 200, msg: '成功/list', result: 111};
    }

    @Get("/add")
    @ApiOperation({summary: '添加'})
    add(): Object {
        return {code: 200, msg: '成功/add', result: 111};
    }


    @Get("/update")
    @ApiOperation({summary: '更新'})
    update(): Object {
        return {code: 200, msg: '成功/update', result: 111};
    }

    @Get("/delete")
    @ApiOperation({summary: '删除'})
    delete(): Object {
        return {code: 200, msg: '成功/delete', result: 111};
    }


}
