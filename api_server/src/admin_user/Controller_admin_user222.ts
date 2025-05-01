import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
import User_service from "./User_service";
import {dto_create} from "./dto_create";
import {Int32} from "typeorm";


// http://127.0.0.1:3000/admin_user/index
// http://127.0.0.1:3000/admin_user/get2

@ApiTags('admin用户管理')
@ApiBearerAuth('Authorization')
@Controller("admin_user")
export default class Controller_admin_user {
    constructor(
        private readonly user_service: User_service,
    ) {
    }

    @ApiOperation({summary: '得到用户2'})
    @Get("/get2")
    async get2() {
        let res = await this.user_service.findOne(11)
        return this.user_service.findOne(11);
        // console.log(`111---res:`, res)
        // return {code: 200, msg: '成功/index', result: 111};
    }


    @ApiOperation({summary: '得到用户'})
    @Get("/get:id")
    async get(@Param("id", ParseIntPipe) id: number) {
        console.log(`get---id:`, id)
        let res = await this.user_service.findOne(id)
        console.log(`get---res:`, res)
        return res
    }

    @ApiOperation({summary: '得到用户列表'})
    @Get("/list")
    async list() {
        // console.log(`get---id:`, id)
        let result = await this.user_service.findAll()
        console.log(`get---result:`, result)
        return {code: 200, msg: '成功/index', result: result};
    }


    // {"username":"小许","password":"123456","role":"admin","nickname":"瘾大技术差","avatar":"https://gitee.com/astmain/static/raw/master/avatar/pikaqiu_01.jpg"}
    @ApiOperation({summary: '添加用户'})
    @ApiBody({type: dto_create})
    @Put("/create")
    async create(@Body() dto: dto_create) {
        // console.log(`create---dto:`, dto)
        let result = await this.user_service.create(dto)
        console.log(`get---result:`, result)
        return {code: 200, msg: '成功/index', result: result};
    }

    @ApiOperation({summary: '更新用户'})
    @Get("/update")
    update(): Object {
        return {code: 200, msg: '成功/index', result: 111};
    }

    @ApiOperation({summary: '删除用户'})
    @Get("/delete:id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        console.log(`delete---id:`, id, typeof (id))
        let result = await this.user_service.delete(id)
        console.log(`get---result:`, result)
        return {code: 200, msg: '成功/index', result: result};
    }

    @ApiOperation({summary: 'index'})
    @Get("/index")
    index(@Param("id") id: number): Object {
        return {code: 200, msg: '成功/index', result: 111};
    }

}
