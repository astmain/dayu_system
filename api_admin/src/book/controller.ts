import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
import service from "./service";


// http://127.0.0.1:3000/user/index

@ApiTags('图书管理')
@ApiBearerAuth('Authorization')
@Controller("book")
export default class controller {
    constructor(private readonly appService: service) {
    }


    @ApiOperation({summary: '得到图书'})
    @Get("/get:id")
    get(@Param("id", ParseIntPipe) id: number): Object {
        console.log(`111---id:`, id, typeof (id))
        console.log(`111---222:`,     333        )
        return {code: 200, msg: '成功/index', result: 111};
    }

    @ApiOperation({summary: '得到图书列表'})
    @Get("/list")
    list(): Object {
        return {code: 200, msg: '成功/index', result: 111};
    }

    @Get("/add")
    @ApiOperation({summary: '添加图书'})
    add(): Object {
        return {code: 200, msg: '成功/index', result: 111};
    }


    @Get("/update")
    @ApiOperation({summary: '更新图书'})
    update(): Object {
        return {code: 200, msg: '成功/index', result: 111};
    }

    @Get("/delete")
    @ApiOperation({summary: '删除图书'})
    delete(): Object {
        return {code: 200, msg: '成功/index', result: 111};
    }


    @ApiOperation({summary: 'index'})
    @Get("/index")
    index(@Param("id") id: number): Object {
        return {code: 200, msg: '成功/index', result: 111};
    }

}
