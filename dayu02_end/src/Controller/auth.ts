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


    @tool.Get_form("find_depart_position_tree", "/查询_部门职位树", [])
    async find_depart_position_tree(@Query() form) {
        let depart_position1 = await db.tb_depart.findMany({include: {ref_position: true},})
        let depart_position2 = await depart_position1.map(o => {
            let children = o.ref_position.map(v => ({...v, name: v.position}))
            return JSON.parse(JSON.stringify({...o, name: o.depart, children: children}))
        })
        let depart_position_tree = tool.build_tree({arr: depart_position2, key_id: 'id', key_parent: 'parent_id'})
        return tool.R.ok({msg: "成功/getAllDepartmentsWithPositions", result: {depart_position_tree}})
    }

    @tool.Get_form("find_menu_tree_permiss", "查询_菜单树权限", [{desc: "角色id", key: 'position_id', val: "1", type: Number, required: true}])
    async find_menu_tree_permiss(@Query() form) {
        console.log(`form`, form)
        let menu_list = await db.tb_menu.findMany()
        // let menu_tree = tool.build_tree({arr: menu_list, key_id: 'id', key_parent: 'parent_id'})
        let ref_position_permiss = await db.ref_position_permiss.findMany({where: {position_id: Number(form.position_id)}})
        console.log(`看看数据量多少---ref_position_permiss.length:`, ref_position_permiss.length)


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


    @tool.Dec_public()
    @ApiOperation({summary: '保存_职位_权限_数据'})
    @Post("/save_ref_position_permiss")
    async save_ref_position_permiss(@Body() form: DTO_role_id_menu_permiss) {
        console.log(`111---form:`, form)
        let menu_list_flat = tool.build_tree_arr_flat(form.tree_data) //扁平化数据

        for (let i = 0; i < menu_list_flat.length; i++) {
            let menu = menu_list_flat[i]
            let one = await db.ref_position_permiss.findMany({where: {menu_id: menu.id, position_id: form.position_id}})
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
                await db.ref_position_permiss.updateMany({where: {menu_id: menu.id, position_id: form.position_id}, data: data})


            } else {
                let data = {
                    menu_id: menu.id,
                    position_id: form.position_id,
                    create: menu.create,
                    delete: menu.delete,
                    update: menu.update,
                    find: menu.find,
                    view: menu.view
                }
                await db.ref_position_permiss.create({data: data})
            }

        }


        // console.log(`111---update_ref_menu_permiss:`,     333        )
        // console.log(`form`, form)
        // let arr_flat = tool.build_tree_arr_flat(form.tree_data)
        // // console.log(`111---arr_flat:`, arr_flat)
        // let one1111 = await db.ref_menu_permiss.findMany({where: {menu_id: 1, role_id: 1}})
        // console.log(`111---one1111:`, one1111)
        // for (let i = 0; i < arr_flat.length; i++) {
        //     let ele = arr_flat[i]
        //     let one = await db.ref_menu_permiss.findMany({where: {menu_id: ele.id, role_id: form.role_id}})
        //     if (one?.length >= 1) {
        //         console.log(`更新---111:`, 111)
        //         let condition = {menu_id: ele.id, role_id: form.role_id}
        //         let item = {id: ele.id, add: ele.add, del: ele.add, update: ele.update, find: ele.find, view: ele.view}
        //         await db.ref_menu_permiss.updateMany({where: {menu_id: ele.id,role_id:form.role_id}, data: {...item, ...condition}})
        //     } else {
        //         console.log(`插入---222:`, 222)
        //         let condition = {menu_id: ele.id, role_id: form.role_id}
        //         let item = {add: ele.add, del: ele.add, update: ele.update, find: ele.find, view: ele.view}
        //         await db.ref_menu_permiss.create({data: {...item, ...condition}})
        //     }
        // }
        console.log(`更新数据完成---update_ref_menu_permiss:`, 333)
        return tool.R.ok({msg: "成功/update_ref_menu_permiss", result: {}})
    }


}
