import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ParseArrayPipe} from '@nestjs/common/pipes/parse-array.pipe';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";
import {PrismaClient} from "@prisma/client";
import tool from "../tool";


let db = new PrismaClient()


@ApiTags('部门管理')
@ApiBearerAuth('Authorization')
@Controller("role")
export class role {


    @tool.Get_form("find_role_list", "/角色_列表", [])
    async find_role_list(@Query() form) {
        console.log(`form`, form)
        let role_list = await db.tb_role.findMany()
        return tool.R.ok({msg: "成功/find_role_list", result: {role_list}})
    }


    @tool.Get_form("find_role_ref_menu_tree", "/角色_管理_菜单树", [])
    async find_departs_tree(@Query() form) {
        console.log(`form`, form)
        let tb_menu = await db.tb_menu.findMany()
        let role_ref_menu_tree = tool.build_tree({arr: tb_menu, key_id: 'menu_id', key_parent: 'parent_id'})
        console.log(`111---role_ref_menu_tree:`, role_ref_menu_tree)
        return tool.R.ok({msg: "成功/find_role_ref_menu_tree", result: {role_ref_menu_tree}})
    }




}



