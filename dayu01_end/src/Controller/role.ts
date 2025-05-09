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


@ApiTags('角色管理')
@ApiBearerAuth('Authorization')
@Controller("role")
export class role {
    @ApiOperation({summary: '得到数据角色菜单'})
    @ApiQuery({name: 'role_id', default: 1, type: Number})
    @UseFilters(new HttpExceptionFilter())
    @Dec_public()
    @Get("/find_role_menu")
    async find_one(@Query("role_id", ParseIntPipe) role_id: number) {
        console.log(`find_role_menu---role_id:`, role_id)
        let role_menu = await db.role_menu.findMany()
        let tb_menu = await db.tb_menu.findMany()
        let menus_flat = util.get_menus_flat_by_role_id({role_id, role_menu, tb_menu})
        console.log(`111---menus_flat:`, menus_flat)
        let menus_chooseed = menus_flat.map(o => o.id)
        console.log(`111---menus_chooseed:`, menus_chooseed)
        return {code: 200, msg: '成功/find_role_menu', result: {  menus_curr:menus_flat   ,     menus_flat: tb_menu, menus_chooseed}};
    }


    @ApiOperation({summary: '得到列表'})
    @Get("/find_list")
    async find_list(@Query("role") role: string) {
        let roles = await db.tb_role.findMany({where: {AND: [{role: {contains: role}},]}})
        return {code: 200, msg: '成功/find_list', result: {roles}};
    }


    @Post("/save")
    @ApiOperation({summary: '保存'})
    async add(@Body() data: DTO_role) {
        console.log(`add---data:`, data)
        let _data = {role: data.role, remark: data.remark}
        let res1 = {id: 0}
        if (data.role_id) {
            // 添加角色表
            res1 = await db.tb_role.upsert({where: {id: data.role_id}, update: _data, create: _data})
            console.log(`111---res1:`, res1)
        } else {
            // 更新角色表
            res1 = await db.tb_role.upsert({where: {role: data.role}, update: _data, create: _data})
            console.log(`111---res1:`, res1)
        }


        //添加角色-菜单表
        let menu_chooseed = data.menus_chooseed
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


    @ApiOperation({summary: '删除'})
    @ApiQuery({name: 'id', default: 999999, type: Number})
    @Get("/delete")
    async delete(@Query("id", ParseIntPipe) id: number) {
        const one = await db.tb_role.deleteMany({where: {id: Number(id)}})
        return {code: 200, msg: '成功/delete', result: {one}};
    }


}
