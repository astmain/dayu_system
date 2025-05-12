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
@Controller("menu")
export class menu {


    @tool.Get_form("find_menu_tree", "菜单树_列表", [])
    async find_role_list(@Query() form) {
        console.log(`form`, form)
        let menu_list = await db.tb_menu.findMany()
        let menu_tree = tool.build_tree({arr: menu_list, key_id: 'id', key_parent: 'parent_id'})
        return tool.R.ok({msg: "成功/menu_tree", result: {menu_tree}})
    }

    @tool.Get_form("find_menu_tree_match_role_id", "菜单树_列表_匹配角色id_菜单id", [{desc: "角色id", key: 'role_id', val: 0, type: Number, required: true},])
    async find_menu_tree_match_role_id(@Query() form) {
        console.log(`form`, form)
        form.role_id = Number(form.role_id)
        // 原始tb_menu
        let menu_list = await db.tb_menu.findMany()
        console.log(`111---menu_list:`, menu_list)

        //菜单树状结构-多月的数据
        let menu_tree = tool.build_tree({arr: menu_list, key_id: 'id', key_parent: 'parent_id'})
        console.log(`111---menu_tree:`, menu_tree)

        // 原始ref_menu_permiss
        let ref_menu_permiss = await db.ref_menu_permiss.findMany({where: {role_id: form.role_id}})
        console.log(`111---ref_menu_permiss:`, ref_menu_permiss)
        //todo ref_menu_permiss 需要去重,使用最新的数据


        // 循环配置菜单角色,数据
        let menu_list_match_role: any = []
        for (let i = 0; i < menu_list.length; i++) {
            let menu = menu_list[i]
            let permiss = ref_menu_permiss.find(o => o.menu_id=== menu.id)
            if(!permiss){
                menu_list_match_role.push(menu)
            }else{
                menu.add = permiss.add
                menu.del = permiss.del
                menu.update = permiss.update
                menu.find = permiss.find
                menu.view = permiss.view
                menu_list_match_role.push(menu)
            }
        }
        let menu_tree_match_role = tool.build_tree({arr: menu_list_match_role, key_id: 'id', key_parent: 'parent_id'})
        console.log(`111---menu_tree:`, menu_tree_match_role)
        return tool.R.ok({msg: "成功/find_menu_tree_match__role_id", result: {menu_list, menu_tree, menu_list_match_role,menu_tree_match_role}})
    }








}



