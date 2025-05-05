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
    @Post("/find_info")
    async find_info(@Body() data: DTO_depart) {
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


    @ApiOperation({summary: '得到列表'})
    @Post("/find_list")
    async find_list(@Body() data: DTO_depart) {
        console.log(`111---data:`, data)
        let departs = await db.tb_depart.findMany({where: {depart: {contains: data.depart}}})
        console.log(`333---departs:`, departs)
        return {code: 200, msg: '成功/find_list', result: {departs}};
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
        if (data.parent_id) {
            let res1 = await db.tb_depart.upsert({
                    where: {depart_parent_id: {depart: _data.depart, parent_id: _data.parent_id,}},
                    update: _data,
                    create: _data,
                }
            )
            console.log(`添加---res1:`, res1)
        } else {
            // res1 = await db.tb_role.upsert({where: {role: data.role}, update: _data, create: _data})
            // console.log(`111---res1:`, res1)
        }


        return {code: 200, msg: '成功/save', result: 1};
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


function build_depart_tree_by_id(departments, parentId) {
    const tree: any = [];

    // 找到所有直接子部门
    const children = departments.filter(dept => dept.parent_id === parentId);

    // 递归处理每个子部门
    for (const child of children) {
        const node = {
            ...child,
            children: build_depart_tree_by_id(departments, child.id)
        };
        tree.push(node);
    }

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
