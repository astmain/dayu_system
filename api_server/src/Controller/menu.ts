import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query, Req} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';

import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";
import {Dec_public} from "../auth/Dec_public";
import util from "../util/index";
import {PrismaClient} from "@prisma/client";

let db = new PrismaClient()


@ApiTags('菜单管理')
@ApiBearerAuth('Authorization')
@Controller("menu")
export class menu {
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
    @UseFilters(new HttpExceptionFilter())
    @Get("/find_list")
    async list(@Req() request) {
        let username = request["user"].username
        let tb_role = await db.tb_role.findMany()
        let tb_menu = await db.tb_menu.findMany()
        let role_user = await db.role_user.findMany()
        let role_menu = await db.role_menu.findMany()
        let menu_tree = util.make_menu_tree({username, tb_role, tb_menu, role_user, role_menu,})
        console.log(`111---menu_tree:`, menu_tree)
        return {code: 200, msg: '成功/list', result: menu_tree};
    }

    @ApiOperation({summary: '添加'})
    @ApiQuery({name: 'menu', default: "首页1", type: String})
    @ApiQuery({name: 'path', default: "/home1", type: String})
    @ApiQuery({name: 'parent', default: "", type: String})
    @UseFilters(new HttpExceptionFilter())
    @Get("/add")
    async add(@Query("menu") menu: string, @Query("path") path: string, @Query("parent") parent: string) {
        // console.log(`111---menu:`, menu)
        // console.log(`111---path:`, path)
        // console.log(`111---parent:`, parent)
        let res = await db.tb_menu.upsert({where: {menu}, update: {menu, path, parent}, create: {menu, path, parent}})
        console.log(`111---res:`, res)
        return {code: 200, msg: '成功/add', result: res};
    }


    @ApiOperation({summary: '更新'})
    @ApiQuery({name: 'id', default: 0, type: Number})
    @ApiQuery({name: 'menu', default: "首页1", type: String})
    @ApiQuery({name: 'path', default: "/home1", type: String})
    @Get("/update")
    async update(@Query("id") id: number, @Query("menu") menu: string, @Query("path") path: string) {
        console.log(`111---id:`, id)
        console.log(`111---menu:`, menu)
        console.log(`111---path:`, path)

        let res = await db.tb_menu.upsert({where: {id}, update: {menu, path}, create: {menu, path}})
        return {code: 200, msg: '成功/update', result: res};
    }


    @ApiOperation({summary: '删除'})
    @ApiQuery({name: 'id', default: 999999, type: Number})
    @Get("/delete")
    async delete(@Query("id", ParseIntPipe) id: number) {
        const one = await db.tb_menu.delete({where: {id: Number(id)}})
        console.log(`delete---one:`, one)
        return {code: 200, msg: '成功/delete', result: one};
    }


}
