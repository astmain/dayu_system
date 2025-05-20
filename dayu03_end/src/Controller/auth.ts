import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query, UnauthorizedException, UsePipes, ValidationPipe} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import {JwtService} from "@nestjs/jwt";
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";

import {Qgetform} from "../util/Qgetform";
import tool from "../tool";

// 数据库
import {PrismaClient} from "@prisma/client";
import {DTO_role_id_menu_permiss} from "../DTO/DTO_role_id_menu_permiss";

let db = new PrismaClient()


@ApiTags('权限管理')
@ApiBearerAuth('Authorization')
@Controller("auth")
export class auth {
    constructor(private jwt_service: JwtService,) {
    }

    @tool.Dec_public()
    @UseFilters(new HttpExceptionFilter())
    @Qgetform("/login", "登陆", [{desc: "电话", key: 'tel', val: "111", type: String, required: true}, {desc: "密码", key: 'password', val: "123456", type: String, required: true}],)
    async login(@Query() form) {
        console.log(`login---tel:`, form)
        // 1.查询用户校验密码
        let user = await db.tb_user.findUnique({where: {tel: form.tel}})
        console.log(`111---user:`, user)
        let password_encode = tool.crypt_encode_md5(form.password)

        console.log(`login---password_encode:`, password_encode) //todo 数据库密码方案使用md5加密
        if (user?.password !== form.password) {
            throw new UnauthorizedException()
        }
        // 2.生成token
        const payload = {username: user?.username, id: user?.id};
        const token = await this.jwt_service.signAsync(payload)
        console.log(`生成token:`, token)
        let tb_menu = await db.tb_menu.findMany()
        console.log(`111---tb_menu:`, tb_menu)
        const menus_tree = tool.build_tree({arr: tb_menu, key_id: 'id', key_parent: 'parent_id'})
        let result = {...user, token, menus_tree}
        // console.log(`111---result:`, result)
        return tool.R.ok({msg: "成功/login", result: result})
    }


    @tool.Get_form("find_permiss_depart_position_tree", "/查询_部门职位树", [])
    async find_permiss_depart_position_tree(@Query() form) {
        let depart_position1 = await db.tb_depart.findMany({include: {tb_role: true},})
        let depart_position_tree1 = tool.build_tree({arr: depart_position1, key_id: 'id', key_parent: 'parent_id'})
        let depart_position_tree = tool.build_tree_depart_role(depart_position_tree1)//修改数据库表名的时候,要修改tb_role这个key
        return tool.R.ok({msg: "成功/getAllDepartmentsWithPositions", result: {depart_position_tree, depart_position1}})
    }

    @tool.Get_form("find_permiss_menu_tree", "查询_菜单树权限", [{desc: "角色id", key: 'position_id', val: "1", type: Number, required: true}])
    async find_permiss_menu_tree(@Query() form) {
        console.log(`form`, form)
        let menu_list = await db.tb_menu.findMany()
        let ref_position_permiss = await db.role_permiss.findMany({where: {role_id: Number(form.position_id)}})
        let menu_list_permiss: any = []
        for (let i = 0; i < menu_list.length; i++) {
            let menu = JSON.parse(JSON.stringify(menu_list[i]))
            let permiss = ref_position_permiss.find(o => o.menu_id === menu.id)
            if (!permiss) {
                menu_list_permiss.push(menu)
            } else {
                menu['create'] = permiss.create
                menu['delete'] = permiss.delete
                menu['update'] = permiss.update
                menu['find'] = permiss.find
                menu['view'] = permiss.view
                menu_list_permiss.push(menu)
            }
        }
        let menu_tree_permiss = tool.build_tree({arr: menu_list_permiss, key_id: 'id', key_parent: 'parent_id'})
        return tool.R.ok({msg: "成功/find_menu_tree_match__role_id", result: {menu_tree_permiss}})
    }

    // 组织=========================================================================================
    @tool.Get_form("depart_create", "新增_组织", [{desc: "组织名称", key: 'depart', val: "", type: String, required: true}, {desc: "父id", key: 'parent_id', val: "", type: Number, required: true}])
    async depart_create(@Query() form) {
        form.parent_id = Number(form.parent_id)
        console.log(`222---form:`, form)
        let one = await db.tb_depart.create({data: {name: form.depart, parent_id: form.parent_id}})
        return tool.R.ok({msg: "成功/depart_create", result: {one}})
    }

    @tool.Get_form("depart_delete", "删除_组织", [{desc: "组织id", key: 'id', val: 0, type: Number, required: true}])
    async delete_depart(@Query() form) {
        form.id = Number(form.id)
        console.log(`111---form:`, form)
        let one = await db.tb_depart.delete({where: {id: form.id}})
        console.log(`222---one:`, one)
        return tool.R.ok({msg: "成功/depart_delete", result: {one}})
    }


    @tool.Get_form("depart_update", "更新_组织", [{desc: "组织id", key: 'id', val: 0, type: Number, required: true}, {desc: "组织名称", key: 'name', val: 0, type: String, required: true}])
    async depart_update(@Query() form) {
        form.id = Number(form.id)
        console.log(`111---form:`, form)
        let one = await db.tb_depart.update({where: {id: form.id}, data: {name: form.name}})
        console.log(`222---one:`, one)
        return tool.R.ok({msg: "成功/depart_update", result: {one}})
    }





    // 角色======================================================================================
    @tool.Get_form("role_create", "新增_职位", [{desc: "职位名称", key: 'name', val: "", type: String, required: true}, {desc: "部门id", key: 'id', val: "", type: Number, required: true}])
    async role_create(@Query() form) {
        form.id = Number(form.id)
        console.log(`111---form:`, form)
        let one = await db.tb_role.create({data: {name: form.name, depart_id: form.id}})
        return tool.R.ok({msg: "成功/role_create", result: {one}})
    }

    @tool.Dec_public()
    @ApiOperation({summary: '角色-保存'})
    @Post("/role_save")
    async role_save(@Body() form: DTO_role_id_menu_permiss) {
        console.log(`111---form:`, form)
        // 保存职位名称
        await db.tb_role.update({where: {id: form.role_id}, data: {name: form.name}})
        // 循环保存职位权限
        let menu_list_flat = tool.build_tree_arr_flat(form.tree_data) //扁平化数据
        for (let i = 0; i < menu_list_flat.length; i++) {
            let menu = menu_list_flat[i]
            let one = await db.role_permiss.findMany({where: {menu_id: menu.id, role_id: form.role_id}})
            console.log(`111---one.length:`, one.length)
            if (one.length >= 1) {
                let data = {
                    create: menu.create,
                    delete: menu.delete,
                    update: menu.update,
                    find: menu.find,
                    view: menu.view
                }
                // 应该是update   ,但是先使用updateMany
                await db.role_permiss.updateMany({where: {menu_id: menu.id, role_id: form.role_id}, data: data})
            } else {
                let data = {
                    menu_id: menu.id,
                    role_id: form.role_id,
                    create: menu.create,
                    delete: menu.delete,
                    update: menu.update,
                    find: menu.find,
                    view: menu.view
                }
                await db.role_permiss.create({data: data})
            }

        }
        console.log(`更新数据完成---update_ref_menu_permiss:`, 333)
        return tool.R.ok({msg: "成功/update_ref_menu_permiss", result: {}})
    }


    @tool.Get_form("role_delete", "删除_角色", [{desc: "职位id", key: 'id', val: 0, type: Number, required: true}])
    async role_delete(@Query() form) {
        form.id = Number(form.id)
        console.log(`删除_职位---form:`, form)
        let one = await db.tb_role.delete({where: {id: form.id}})
        console.log(`删除_职位---one:`, one)
        return tool.R.ok({msg: "成功/role_delete", result: {one}})
    }

}

