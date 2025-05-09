import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ParseArrayPipe} from '@nestjs/common/pipes/parse-array.pipe';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";
import {Dec_public} from "../auth/Dec_public";
import {PrismaClient} from "@prisma/client";
import util from "../util/index";
import {DTO_role} from "../DTO/DTO_role";
import get_menus_flat_by_role_id from "../util/make_menus_flat_by_role_id";

let db = new PrismaClient()


@ApiTags('测试借口')

@Controller("test")
export class test {
    @ApiOperation({summary: '得到数据'})
    @ApiQuery({name: 'role_id', default: 1, type: Number})
    @UseFilters(new HttpExceptionFilter())
    @Dec_public()
    @Get("/find_one")
    async find_one(@Query("role_id", ParseIntPipe) role_id: number) {

        return {code: 200, msg: '成功/find_one', result: 1};
    }


    @ApiOperation({summary: '得到列表'})
    @Get("/find_list")
    async find_list(@Query("role") role: string) {
        return {code: 200, msg: '成功/find_list', result: 1};
    }


    @Post("/save")
    @ApiOperation({summary: '保存'})
    async add(@Body() data: DTO_role) {
        return {code: 200, msg: '成功/add', result: 1};
    }


    @Get("/update")
    @ApiOperation({summary: '更新'})
    async update() {
        return {code: 200, msg: '成功/update', result: 111};
    }


    @ApiOperation({summary: '删除'})
    @ApiQuery({name: 'id', default: 999999, type: Number})
    @Get("/delete")
    async delete(@Query("id", ParseIntPipe) id: number) {
        return {code: 200, msg: '成功/delete', result: 111};
    }


}
