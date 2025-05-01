import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";
import {Dec_public} from "../auth/Dec_public";
import {Service_user} from "./Service_user";
import {PrismaClient} from "@prisma/client";
import util from "../util";

let db = new PrismaClient()

// http://127.0.0.1:3000/user/index

@ApiTags('用户管理')
@ApiBearerAuth('Authorization')
@Controller("user")
export class Controller_user {
    constructor(private readonly service_user: Service_user) {
    }

    @ApiOperation({summary: '得到菜单'})
    @ApiQuery({name: 'username', default: "admin", type: String})
    @UseFilters(new HttpExceptionFilter())
    @Get("/menu_tree")
    async menu_tree(@Query("username") username: string) {
        let tb_role = await db.tb_role.findMany()
        let tb_menu = await db.tb_menu.findMany()
        let role_user = await db.role_user.findMany()
        let role_menu = await db.role_menu.findMany()
        let menu_tree = make_menu_tree({username, tb_role, tb_menu, role_user, role_menu,})
        console.log(`999---menu_tree:`, menu_tree)


        return util.R.ok({msg: "成功", result: menu_tree})
    }


    @ApiOperation({summary: '得到列表'})
    @Get("/list")
    list(): Object {
        return {code: 200, msg: '成功/list', result: 111};
    }

    @Get("/add")
    @ApiOperation({summary: '添加'})
    add(): Object {
        return {code: 200, msg: '成功/add', result: 111};
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


function make_menu_tree({username, tb_role, tb_menu, role_user, role_menu,}) {
    const userRoles = role_user.filter(ru => ru.username === username).map(ru => ru.role);
    // console.log(`111---userRoles:`, userRoles)
    const userMenus = role_menu.filter(rm => userRoles.includes(rm.role)).map(rm => rm.menu);
    // console.log(`222---userMenus:`, userMenus)
    const fullMenus = tb_menu.filter(m => userMenus.includes(m.menu));

    // console.log(`333---fullMenus:`, fullMenus)

    function buildMenuTree(menus, parent = "") {
        return menus.filter(item => item.parent === parent)
            .map(item => ({
                menu: item.menu,
                path: item.path,
                children: buildMenuTree(menus, item.menu)
            }))
            .filter(item => item !== null);
    }

    return buildMenuTree(fullMenus)


}

// res = make_menu_tree({q, tb_role, tb_menu, role_user, role_menu,})