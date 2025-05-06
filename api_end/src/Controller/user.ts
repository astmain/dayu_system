import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';

// 自定义
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";
import {Dec_public} from "../auth/Dec_public";
import {PrismaClient} from "@prisma/client";
import util from "../util/index";
import {DTO_role} from "../Dto/DTO_role";
import {DTO_user} from "../Dto/DTO_user";
import Dto from "../Dto/Dto";
import get_menus_flat_by_role_id from "../util/make_menus_flat_by_role_id";
import {DTO_depart} from "../Dto/DTO_depart";

let db = new PrismaClient()


@ApiTags('用户管理')
@ApiBearerAuth('Authorization')
@Controller("user")
export class user {
    @ApiOperation({summary: '新增用户'})
    @UseFilters(new HttpExceptionFilter())
    @Post("/add")
    async add(@Body() data) {
        console.log(`add---data:`, data)
        let tb = {tel: data.tel, username: data.username}
        let one1 = await db.tb_user.create({data: tb})
        let one2 = await db.depart_user.create({data: {depart_id :data.depart_id    ,user_id:one1.id}})
        console.log(`add---one1:`, one1)
        console.log(`add---one2:`, one2)
        return {code: 200, msg: '成功/add ', result: {one1,one2}};
    }

    @Get("/delete")
    @ApiOperation({summary: '删除'})
    async delete(@Body() data: DTO_user) {
        console.log(`delete---data:`, data)
        const one = await db.tb_depart.delete({where: {id: data.id}})
        return {code: 200, msg: '成功/delete', result: {one}};
    }


    @ApiOperation({summary: '更新用户'})
    @Get("/update")
    update(@Body() data: DTO_user) {
        console.log(`111---data:`, data)

        return {code: 200, msg: '成功/update', result: 111};
    }


}
