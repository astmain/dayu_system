import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ParseArrayPipe} from '@nestjs/common/pipes/parse-array.pipe';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";
import {Dec_public} from "../auth/Dec_public";
import {PrismaClient} from "@prisma/client";
import {array} from "yup";
import {IsArray, IsNotEmpty, IsString} from "class-validator";
import {DTO_role} from "../Dto/DTO_role";

let db = new PrismaClient()


@ApiTags('角色管理')
@ApiBearerAuth('Authorization')
@Controller("role")
export class role {
    @ApiOperation({summary: '得到数据'})
    @ApiQuery({name: 'username', default: "admin", type: String})
    @ApiQuery({name: 'password', default: "123456", type: String})
    @UseFilters(new HttpExceptionFilter())
    @Dec_public()
    @Get("/find_one")
    async find_one(@Query("username") username: string, @Query("password",) password: string) {
    }


    @ApiOperation({summary: '得到列表'})
    @Get("/find_list")
    async find_list(@Query("role") role: string) {
        let roles = await db.tb_role.findMany({where: {AND: [{role: {contains: role}},]}})
        return {code: 200, msg: '成功/find_list', result: {roles}};
    }


    @Post("/add")
    @ApiOperation({summary: '添加'})
    async add(@Body() data: DTO_role) {
        console.log(`add---data:`, data)
        let _data = {role: data.role, remark: data.remark}

        // 添加角色表
        let res1 = await db.tb_role.upsert({where: {role: data.role}, update: _data, create: _data})
        console.log(`111---res1:`, res1)

        //添加角色-菜单表
        let menu_chooseed = data.menu_chooseed
        let role_id = res1.id
        let res2s: any = []
        for (let i = 0; i < menu_chooseed.length; i++) {
            let menu_id = menu_chooseed[i]
            let data2 = {role_id, menu_id}
            let res2 = await db.role_menu.upsert({where: {role_id_menu_id: {role_id, menu_id,}}, update: data2, create: data2})
            res2s.push(res2)
        }
        // role_menu
        return {code: 200, msg: '成功/add', result: {res1, res2s}};
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
