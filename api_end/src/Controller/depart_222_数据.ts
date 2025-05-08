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
import DTO from "../DTO/DTO";
import get_menus_flat_by_role_id from "../util/make_menus_flat_by_role_id";
import {DTO_depart} from "../DTO/DTO_depart";
import {QQ} from "../util/QQ";
import {Qform} from "../util/Qform";

let db = new PrismaClient()


@ApiTags('部门管理')
@ApiBearerAuth('Authorization')
@Controller("depart")
export class depart {
    @ApiOperation({summary: '得到数据'})
    @UseFilters(new HttpExceptionFilter())
    @Post("/find_user_info_list")
    async find_user_info_list(@Body() data: DTO_depart) {
        console.log(`data---`, data)
        let depart_childIds = build_depart_childIds_by_id(await db.tb_depart.findMany(), data.depart_id)
        console.log(`111---depart_childIds:`, depart_childIds)
        const depart_user = await db.depart_user.findMany({
            distinct: ['user_id'],
            select: {user_id: true},
            where: {depart_id: {in: depart_childIds}},
        })

        const depart_user_id = depart_user.map(o => o.user_id)
        console.log(`111---depart_user:`, depart_user)
        console.log(`111---depart_user_id:`, depart_user_id)
        const users = await db.tb_user.findMany({where: {id: {in: depart_user_id}}})
        return {code: 200, msg: 'find_info/find_one', result: {users}};
    }


    @ApiOperation({summary: '得到列表--准备弃用'})
    @Post("/find_list")
    async find_list(@Body() data: DTO_depart) {
        console.log(`111---data:`, data)
        let departs = await db.tb_depart.findMany({where: {depart: {contains: data.depart}}})
        console.log(`333---departs:`, departs)
        let departs_tree = util.build_departs_tree(departs)
        return {code: 200, msg: '成功/find_list', result: {departs, departs_tree}};
    }


    @ApiOperation({summary: '部门树状态结构'})
    @Post("/build_departs_tree")
    async build_departs_tree() {
        let departs = await db.tb_depart.findMany()
        let departs_tree = util.build_departs_tree(departs)
        return {code: 200, msg: '成功/build_departs_tree', result: {departs_tree}};
    }


    @ApiOperation({summary: '部门选项'})
    @Post("/depart_opt")
    async depart_opt(@Body() data: DTO_depart) {
        console.log(`111---data:`, data)
        let departs = await db.tb_depart.findMany()
        console.log(`333---departs:`, departs)
        let opt_list = build_depart_tree(departs)
        let opt_val = [1]
        return {code: 200, msg: '成功/find_list', result: {departs, opt_list, opt_val}};
    }


    @ApiOperation({summary: '保存'})
    @Post("/save")
    async add(@Body() data: DTO_depart) {
        console.log(`save---data:`, data)
        let _data = {depart: data.depart, parent_id: data.parent_id}
        let res1 = {id: 0}
        if (data.parent_id && data.id) {
            let _data22 = {depart: data.depart, parent_id: data.parent_id}
            res1 = await db.tb_depart.upsert({where: {id: data.id}, update: _data22, create: _data22})
            console.log(`更新---res1:`, res1)
        } else {
            let res1 = await db.tb_depart.upsert({
                    where: {depart_parent_id: {depart: _data.depart, parent_id: _data.parent_id,}},
                    update: _data,
                    create: _data,
                }
            )
            console.log(`添加---res1:`, res1)
        }


        return {code: 200, msg: '成功/save', result: 1};
    }


    @Get("/update")
    @ApiOperation({summary: '更新'})
    async update() {
        return {code: 200, msg: '成功/update', result: 111};
    }


    @ApiOperation({summary: '删除'})
    @Post("/delete")
    async delete(@Body() data: DTO_depart) {
        console.log(`delete---data:`, data)
        const one = await db.tb_depart.deleteMany({where: {id: data.id}})
        console.log(`delete---one:`, one)
        return {code: 200, msg: '成功/delete', result: one};
    }


    @ApiOperation({summary: '得到_部门树'})
    @ApiQuery({name: 'user_id', required: false, type: Number, default: 0, description: '用户id'})
    @ApiQuery({name: 'depart_id', required: false, type: Number, default: 0, description: '部门id'})
    @Get("/find_departs_tree")
    async find_departs_tree(
        @Qform([
            {name: 'user_id', type: 'int', required: false},
            {name: 'depart_id', type: 'int', required: false}
        ]) form) {
        console.log(`111---find_menus_tree:`, form, typeof form)


        // 部门树====================================================
        let departs = await db.tb_depart.findMany()
        let departs_tree = util.build_departs_tree(departs)


        // 部门关系选中====================================================
        const user = await db.tb_user.findMany({where: {id: form.user_id}})
        console.log(`1-1---user:`, user)
        // 查询部门关联用户
        let depart_user = await db.depart_user.findMany({where: {user_id: form.user_id}})
        let departs_checked = depart_user.map(o => o.depart_id)
        console.log(`1-2---departs_checked:`, departs_checked)

        //查询部门
        const tb_depart = await db.tb_depart.findMany({orderBy: {parent_id: 'desc'}})
        console.log(`1-3---tb_depart:`, tb_depart)
        return {code: 200, msg: '成功/find_menus_tree', result: {departs_tree, departs_checked}};
    }

    //
    @ApiOperation({summary: '得到_部门-菜单-按钮'})
    @ApiQuery({name: 'depart_id', required: false, type: Number, default: 0, description: '部门id'})
    @Get("/find_depart_menu_btn")
    async find_depart_menu_btn(
        @Qform([
            {name: 'depart_id', type: 'int', required: false}
        ]) form) {
        let depart_menu = await db.depart_menu.findMany({where: {depart_id: form.depart_id}})
        console.log(`111---depart_menu:`, depart_menu)
        let depart_menu_btns = util.build_depart_menu_btn(depart_menu)
        console.log(`111---depart_menu_btns:`, depart_menu_btns)
        return {code: 200, msg: '成功/find_depart_menu_btn', result: {depart_menu, depart_menu_btns}};
    }


    @ApiOperation({summary: '添加_部门-权限'})
    @ApiQuery({name: 'other', required: false, type: String, default: "", description: '其他'})
    @ApiQuery({name: 'role', required: false, type: String, default: "", description: '角色'})
    @ApiQuery({name: 'add', required: false, type: Boolean, default: false, description: '添加'})
    @ApiQuery({name: 'del', required: false, type: Boolean, default: false, description: '删除'})
    @ApiQuery({name: 'look', required: false, type: Boolean, default: false, description: '查看'})
    @ApiQuery({name: 'update', required: false, type: Boolean, default: false, description: '更新'})
    @ApiQuery({name: 'user_id', required: false, type: Number, default: 0, description: '用户id'})
    @ApiQuery({name: 'depart_id', required: false, type: Number, default: 0, description: '部门id'})
    @ApiQuery({name: 'menu_id', required: false, type: Number, default: 0, description: '菜单id'})
    @Get("/add_depart_permission")
    async add_depart_permission(
        @Qform([
            {name: 'other', type: 'string', required: false},
            {name: 'role', type: 'string', required: false},
            {name: 'add', type: 'boolean', required: false},
            {name: 'del', type: 'boolean', required: false},
            {name: 'look', type: 'boolean', required: false},
            {name: 'update', type: 'boolean', required: false},
            {name: 'user_id', type: 'int', required: false},
            {name: 'depart_id', type: 'int', required: false},
            {name: 'menu_id', type: 'int', required: false},
        ]) form) {
        let tag = "add_depart_permission"
        console.log(tag, `111---form:`, form)
        let one = await db.depart_menu.create({data: form})
        console.log(tag, `222---one:`, one)
        return {code: 200, msg: '成功/add_depart_permission', result: {one}};
    }


}


function build_depart_tree(departments) {
    // 创建一个映射来存储所有部门
    const departMap = new Map();
    const tree: any = [];

    // 首先将所有部门放入映射中
    departments.forEach(dept => {
        departMap.set(dept.id, {
            ...dept,
            value: dept.id,
            label: dept.depart,
            children: []
        });
    });

    // 构建树结构
    departments.forEach(dept => {
        const node = departMap.get(dept.id);
        if (dept.parent_id === 0) {
            // 如果是根节点，直接添加到树中
            tree.push(node);
        } else {
            // 如果不是根节点，添加到父节点的children中
            const parent = departMap.get(dept.parent_id);
            if (parent) {
                parent.children.push(node);
            }
        }
    });

    return tree;
}


function build_depart_childIds_by_id(depart, departId) {
    const result = new Set([departId]); // 使用Set来存储唯一的ID

    // 递归查找所有子部门
    function findChildren(parentId) {
        const children = depart.filter(item => item.parent_id === parentId);
        children.forEach(child => {
            result.add(child.id);
            findChildren(child.id);
        });
    }

    findChildren(departId);
    return Array.from(result);
}



