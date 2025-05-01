import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
import {Service_auth} from "./Service_auth";


// http://127.0.0.1:3000/user/index

@ApiTags('权限管理')
@ApiBearerAuth('Authorization')
@Controller("test")
export class Controller_auth {
    constructor(private readonly service_auth: Service_auth) {
    }


    @ApiOperation({summary: '得到数据'})
    @Get("/get:id")
    get(@Param("id", ParseIntPipe) id: number): Object {
        console.log(`111---id:`, id, typeof (id))
        console.log(`111---222:`, 333)
        return {code: 200, msg: '成功/index', result: 111};
    }

    @ApiOperation({summary: '得到列表'})
    @Get("/list")
    list(): Object {
        return {code: 200, msg: '成功/index', result: 111};
    }

    @Get("/add")
    @ApiOperation({summary: '添加'})
    add(): Object {
        return {code: 200, msg: '成功/index', result: 111};
    }


    @Get("/update")
    @ApiOperation({summary: '更新'})
    update(): Object {
        return {code: 200, msg: '成功/index', result: 111};
    }

    @Get("/delete")
    @ApiOperation({summary: '删除'})
    delete(): Object {
        return {code: 200, msg: '成功/index', result: 111};
    }


}
