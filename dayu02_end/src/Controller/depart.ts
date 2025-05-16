import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ParseArrayPipe} from '@nestjs/common/pipes/parse-array.pipe';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";
import {PrismaClient} from "@prisma/client";
import tool from "../tool";
import {json} from "express";


let db = new PrismaClient()


@ApiTags('部门管理')
@ApiBearerAuth('Authorization')
@Controller("depart")
export class depart {

    @tool.Dec_public()
    @tool.Get_form("find_departs_tree", "/得到_部门树", [])
    async find_departs_tree(@Query() form) {
        console.log(`form`, form)
        // let departs = await db.tb_depart.findMany({where: {depart: {contains: data.depart}}})
        let tb_depart = await db.tb_depart.findMany()
        let departs_tree = tool.build_tree({arr: tb_depart, key_id: 'id', key_parent: 'parent_id'})
        // build_tree({ arr: tb_depart, key_id: 'depart_id', key_parent: 'parent_id' })
        return tool.R.ok({msg: "成功/find_departs_tree", result: {departs_tree}})
    }

    @tool.Get_form("find_user_list_BY_depart_id", "查找_用户_根据_部门id", [{desc: "部门id", key: 'depart_id', val: 0, type: Number, required: true}, {desc: "是否父级部门", key: 'is_parent', val: 0, type: Boolean, required: true},])
    async find_user_list_BY_depart_id(@Query() form) {
        console.log(`form`, form)
        form.depart_id = Number(form.depart_id)
        form.is_parent = Boolean(form.depart_id)
        // 筛选用户10000
        if (form.depart_id === 10000) {
            // 预备排除客户
            let depart_list_7777 = await db.ref_depart_user.findMany({where: {OR: [{id: 77777}, {depart_id: 77777}]}})
            let notin_ids_7777 = tool.build_tree_ids({list: depart_list_7777, val: 77777, key: "id", ref: "parent_id"})
            let refs_user_id = await db.ref_depart_user.findMany({where: {depart_id: {in: notin_ids_7777}}})
            let notIn_user_ids = refs_user_id.map(item => item.user_id)
            // 排除客户
            let user_list = await db.tb_user.findMany({
                where: {id: {notIn: notIn_user_ids}}
            })
            console.log(`333---user_list:`, user_list)
            return tool.R.ok({msg: "成功/find_user_list_BY_depart_id", result: {user_list, kind: "筛选用户10000"}})
        }


        // 得到部门id和子部门id
        let depart_list = await db.tb_depart.findMany()
        let ids = tool.build_tree_ids({list: depart_list, val: form.depart_id, key: "id", ref: "parent_id"})
        // 得到用户id
        let refs_user_id = await db.ref_depart_user.findMany({where: {depart_id: {in: ids}}})
        let refs_user_id_1: number[] = [0]
        refs_user_id_1 = refs_user_id.map(item => item.user_id)
        // console.log(`111---refs_user_id_2:`, refs_user_id_1)
        // 得到用户数据_根据_用户id
        let user_list = await db.tb_user.findMany({where: {id: {in: refs_user_id_1}}})
        // console.log(`333---user_list:`, user_list)

        return tool.R.ok({msg: "成功/find_user_list_BY_depart_id", result: {user_list, kind: "筛选部门"}})
    }


    @tool.Dec_public()
    @tool.Get_form("find_depart_ref", "/查询_部门角色关系", [])
    async find_depart_ref(@Query() form) {
        console.log(`form`, form)

        // let depart_list = await db.tb_depart.findMany({
        //     include: {
        //         tb_depart_permiss: true,
        //     }
        // })


        let menus_tree = [
            {
                "id": 1,
                "menu": "首页",
                "path": "/home",
                "add": false,
                "del": false,
                "update": false,
                "find": false,
                "view": false,
                "parent_id": 0,
                "name": "首页",
                "path_full": "/home"
            },
            {
                "id": 2,
                "menu": "关于",
                "path": "/about",
                "add": false,
                "del": false,
                "update": false,
                "find": false,
                "view": false,
                "parent_id": 0,
                "name": "关于",
                "path_full": "/about"
            },
            {
                "id": 3,
                "menu": "设置",
                "path": "/setting",
                "add": false,
                "del": false,
                "update": false,
                "find": false,
                "view": false,
                "parent_id": 0,
                "name": "设置",
                "path_full": "/setting"
            },
            {
                "id": 4,
                "menu": "订单管理",
                "path": "/order_manage",
                "add": false,
                "del": false,
                "update": false,
                "find": false,
                "view": false,
                "parent_id": 0,
                "name": "订单管理",
                "path_full": "/order_manage"
            },
            {
                "id": 5,
                "menu": "权限管理",
                "path": "/system",
                "add": false,
                "del": false,
                "update": false,
                "find": false,
                "view": false,
                "parent_id": 0,
                "children": [
                    {
                        "id": 6,
                        "menu": "用户管理",
                        "path": "/user/user",
                        "add": false,
                        "del": false,
                        "update": false,
                        "find": false,
                        "view": false,
                        "parent_id": 5,
                        "name": "用户管理",
                        "path_full": "/system/user/user"
                    },
                    {
                        "id": 7,
                        "menu": "菜单管理",
                        "path": "/menu/menu",
                        "add": false,
                        "del": false,
                        "update": false,
                        "find": false,
                        "view": false,
                        "parent_id": 5,
                        "name": "菜单管理",
                        "path_full": "/system/menu/menu"
                    },
                    {
                        "id": 8,
                        "menu": "角色管理",
                        "path": "/role/role",
                        "add": false,
                        "del": false,
                        "update": false,
                        "find": false,
                        "view": false,
                        "parent_id": 5,
                        "name": "角色管理",
                        "path_full": "/system/role/role"
                    }
                ],
                "name": "权限管理",
                "path_full": "/system"
            },
            {
                "id": 666,
                "menu": "商品管理",
                "path": "/mall_goods",
                "add": false,
                "del": false,
                "update": false,
                "find": false,
                "view": false,
                "parent_id": 0,
                "name": "商品管理",
                "path_full": "/mall_goods"
            },
            {
                "id": 777,
                "menu": "商城购物",
                "path": "/mall_shop",
                "add": false,
                "del": false,
                "update": false,
                "find": false,
                "view": false,
                "parent_id": 0,
                "name": "商城购物",
                "path_full": "/mall_shop"
            },
            {
                "id": 888,
                "menu": "购物订单",
                "path": "/mall_order",
                "add": false,
                "del": false,
                "update": false,
                "find": false,
                "view": false,
                "parent_id": 0,
                "name": "购物订单",
                "path_full": "/mall_order"
            },
            {
                "id": 999,
                "menu": "购物车",
                "path": "/mall_car",
                "add": false,
                "del": false,
                "update": false,
                "find": false,
                "view": false,
                "parent_id": 0,
                "name": "购物车",
                "path_full": "/mall_car"
            }
        ]

        return tool.R.ok({msg: "成功/find_depart_ref", result: {menus_tree}})
    }


    @tool.Dec_public()
    @tool.Get_form("getAllDepartmentsWithPositions", "/查询_部门角色关系2", [])
    async getAllDepartmentsWithPositions(@Query() form) {
        let depart_position1 = await db.tb_depart.findMany({
            // where: {add: true},
            include: {ref_position: true},
            // include: {ref_position: false},
        })

        // console.log(`111---depart_position1:`, depart_position1)

        let depart_position2 = await depart_position1.map(o => {
            let children = o.ref_position.map(v => ({...v, name: v.position}))
            return JSON.parse(JSON.stringify({...o, name: o.depart, children: children}))
        })
        // console.log(`222---depart_position2:`, JSON.stringify(depart_position2))


        let depart_position3 = tool.build_tree({arr: depart_position2, key_id: 'id', key_parent: 'parent_id'})
        // console.log()
        // console.log()
        // console.log()
        // console.log(`333---depart_position3:`, JSON.stringify(depart_position3))
        // console.log(`333---depart_position3:`, depart_position3)

        // const depart_position = await db.tb_depart.findMany({
        //     select: { id: true } // 按需查询
        // });
        return tool.R.ok({msg: "成功/getAllDepartmentsWithPositions", result: {depart_position: depart_position3, depart_position2}})
    }

    @tool.Dec_public()
    @tool.Get_form("update_DepartmentsWithPositions", "/更新_部门角色关系2", [
        {desc: "是否是部门", key: 'is_position', val: true, type: Boolean, required: true},
        {desc: "部门id或者职位id", key: 'id', val: 0, type: Number, required: true},
        {desc: "部门名称或者职位名称", key: 'name', val: "", type: String, required: true},
    ])
    async update_DepartmentsWithPositions(@Query() form) {
        console.log(`111---form:`, form)
        form.is_position = Boolean(form.is_position)
        form.id = Number(form.id)
        console.log(`222---form:`, form)

        if (form.is_position) {
            console.log(`111---职位:`,         111    )
            await db.ref_position.update({
                where: {id: form.id},
                data: {
                    position: form.name
                }
            })
        }

        if (!form.is_position) {
            console.log(`222---部门:`,         111    )
            await db.tb_depart.update({
                where: {id: form.id},
                data: {
                    depart: form.name
                }
            })
        }


        return tool.R.ok({msg: "成功/update_DepartmentsWithPositions", result: {depart_position: 111}})
    }


    @tool.Dec_public()
    @tool.Get_form("add_Position", "/新增_职位", [
        {desc: "部门id", key: 'id', val: 0, type: Number, required: true},
        {desc: "职位名称", key: 'name', val: "", type: String, required: true},
    ])
    async add_Position(@Query() form) {
        console.log(`111---form:`, form)
        form.id = Number(form.id)
        console.log(`222---form:`, form)
        await db.tb_depart.update({
            where: {id: form.id},
            data: {
                ref_position: {
                    create:[
                        {position:form.name}
                    ]
                }
            }
        })

        // ref_position: {
        //     create: [
        //         { position: '财务总监' },
        //         { position: '会计' },
        //         { position: '出纳' }
        //     ]
        // }


        // const finance = await db.tb_depart.create({
        //     data: {
        //         depart: '财务部',
        //         add: true,
        //         del: false,
        //         update: true,
        //         look: true,
        //         parent_id: 0,
        //         ref_position: {
        //             create: [
        //                 { position: '财务总监' },
        //                 { position: '会计' },
        //                 { position: '出纳' }
        //             ]
        //         }
        //     }
        // })


        return tool.R.ok({msg: "成功/add_Position", result: {depart_position: 111}})
    }


}



