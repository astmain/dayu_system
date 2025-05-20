import {Controller, Get, ParseIntPipe, Post, Query, Req, UseFilters} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiQuery, ApiTags} from '@nestjs/swagger';

import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";
import util from "../util/index";
import {PrismaClient} from "@prisma/client";

let db = new PrismaClient()


@ApiTags('菜单管理')
@ApiBearerAuth('Authorization')
@Controller("menu")
export class menu {
    @ApiOperation({summary: '得到列表'})
    @ApiQuery({name: 'menu', default: "首页1", type: String})
    @ApiQuery({name: 'path', default: "/home1", type: String})
    @UseFilters(new HttpExceptionFilter())
    @Get("/find_list")
    async list(@Req() request, @Query("menu") menu: string = "", @Query("menu") path: string = "") {
        let user = request["user"]
        console.log(`111---menu:`, menu)
        // 数据库表
        let tb_role = await db.tb_role.findMany()
        let tb_menu = await db.tb_menu.findMany({where: {AND: [{menu: {contains: menu}}, {path: {contains: path}},]}})
        let role_user = await db.role_user.findMany()
        let role_menu = await db.role_menu.findMany()

        // 菜单数据-扁平结构
        const menus_flat = util.menu_get_menus_flat_by_user_id({tb_menu, role_user, role_menu, user_id: user.id})
        // console.log(`111---menus_flat:`, menus_flat)

        // 菜单数据-树状结构
        const menus_tree = util.menu_get_menus_tree({menus: menus_flat})
        // console.log(`111---menus_tree:`, menus_tree)

        // 返回参数
        let result = {menus_tree, menus_flat: menus_flat, user}
        // console.log(`111---result:`, result)
        return {code: 200, msg: '成功/find_list', result: result};
    }

    @ApiOperation({summary: '添加'})
    @ApiQuery({name: 'menu', default: "首页1", type: String})
    @ApiQuery({name: 'path', default: "/home1", type: String})
    @ApiQuery({name: 'parent_id', default: 0, type: Number})
    @UseFilters(new HttpExceptionFilter())
    @Get("/add")
    async add(@Query("menu") menu: string, @Query("path") path: string, @Query("parent_id", ParseIntPipe) parent_id: number) {
        console.log(`111---menu:`, menu)
        console.log(`111---path:`, path)
        console.log(`111---parent_id:`, parent_id)

        let res = await db.tb_menu.upsert({where: {menu}, update: {menu, path, parent_id}, create: {menu, path, parent_id}})
        console.log(`111---res:`, res)
        return {code: 200, msg: '成功/add', result: res};
    }


    @ApiOperation({summary: '更新'})
    // @ApiQuery({name: 'id', default: 0, type: Number})
    // @ApiQuery({name: 'menu', default: "首页1", type: String})
    // @ApiQuery({name: 'path', default: "/home1", type: String})
    @Get("/update")
    async update(@Query("id", ParseIntPipe) id: number, @Query("menu") menu: string, @Query("path") path: string) {
        console.log(`111---id:`, id, typeof id)
        console.log(`111---menu:`, menu, typeof menu)
        console.log(`111---path:`, menu, typeof menu)
        let res = await db.tb_menu.upsert({where: {id}, update: {menu, path}, create: {menu, path}})
        return {code: 200, msg: '成功/update', result: res};
    }


    @ApiOperation({summary: '删除'})
    @ApiQuery({name: 'id', default: 999999, type: Number})
    @Get("/delete")
    async delete(@Query("id", ParseIntPipe) id: number) {
        const one = await db.tb_menu.deleteMany({where: {id: Number(id)}})
        const one_child = await db.tb_menu.deleteMany({where: {parent_id: Number(id)}})
        console.log(`delete---one:`, one)
        console.log(`delete---one_child:`, one_child)
        return {code: 200, msg: '成功/delete', result: one};
    }

    @ApiOperation({summary: '得到_菜单树'})
    @ApiQuery({name: 'menu', required: false, type: String, default: "首页", description: '菜单名称'})
    @Get("/find_menus_tree")
    async find_menus_tree(@Query("menu",) menu: string = "") {
        console.log(`111---find_menus_tree:`, menu)
        let tb_menu = await db.tb_menu.findMany({where: {AND: [{menu: {contains: menu}},]}})
        const menus_tree = util.menu_get_menus_tree({menus: tb_menu})
        return {code: 200, msg: '成功/find_menus_tree', result: {menus_tree}};
    }


}
