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
import {DTO_role} from "../Dto/DTO_role";
import Dto from "../Dto/Dto";
import get_menus_flat_by_role_id from "../util/make_menus_flat_by_role_id";
import {DTO_depart} from "../Dto/DTO_depart";

let db = new PrismaClient()


@ApiTags('部门管理')
@ApiBearerAuth('Authorization')
@Controller("depart")
export class depart {
    @ApiOperation({summary: '得到数据'})
    @UseFilters(new HttpExceptionFilter())
    @Get("/find_info")
    async find_info(@Body() data: DTO_depart) {
        console.log(`111---`, 111)
        return {code: 200, msg: 'find_info/find_one', result: 1};
    }


    @ApiOperation({summary: '得到列表'})
    @Post("/find_list")
    async find_list(@Body() data: DTO_depart) {
        console.log(`111---data:`, data)
        let departs = await db.tb_depart.findMany({where: {depart: {contains: data.depart}}})
        console.log(`333---departs:`, departs)
        return {code: 200, msg: '成功/find_list', result: {departs}};
    }


    @ApiOperation({summary: '保存'})
    @Post("/save")
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
