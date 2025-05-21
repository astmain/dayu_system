import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query, Inject} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ParseArrayPipe} from '@nestjs/common/pipes/parse-array.pipe';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";
import tool from "../tool";
import {Qgetform} from "../util/Qgetform";
import {DTO_role_id_menu_permiss} from "../DTO/DTO_role_id_menu_permiss";
import {DTO_user_create} from "../DTO/DTO_user_create";




@ApiTags('用户管理')
@ApiBearerAuth('Authorization')
@Controller("user")
export class user {
    constructor(@Inject("db_prisma") private db: any) {
    }

    @Qgetform("find_user_list", "查找_用户列表", [])
    async find_user_list(@Query() form) {

    }

    @tool.Dec_public()
    @tool.Get_form("create_user", "/新增用户", [{desc: "职位ids", key: 'depart_ids', val: [], type: String, required: true}, {desc: "电话", key: 'tel', val: "123", type: String, required: true}, {desc: "用户名", key: 'username', val: "111", type: String, required: true},])
    async create_user(@Query() form) {
        form.depart_ids = JSON.parse(form.depart_ids)
        console.log(`111---form:`,     form        )
        let one = await this.db.tb_user.findUnique({where: {tel: form.tel}})
        console.log(`111---one:`, one)
        if (one) return tool.R.err({msg: "失败:手机号码已经被其他用户注册", result: {}})


        // form.position_ids = JSON.parse(form.position_ids)
        // console.log(`create_user---form:`, form)
        // let one = await db.tb_user.findUnique({where: {tel: form.tel}})
        // console.log(`111---one:`, one)
        // if (one) return tool.R.err({msg: "失败:手机号码已经被其他用户注册", result: {}})
        // let user = await db.tb_user.create({data: {username: form.username, tel: form.tel}})
        // console.log(`111---user:`, user)
        // for (let i = 0; i < form.position_ids.length; i++) {
        //     let position_id = form.position_ids[i]
        //     let one_position_user = await db.role_user.create({data: {user_id: user.id, role_id: position_id || 0}})
        // }
        return tool.R.ok({msg: "成功/create_user", result: {}})

    }


    @tool.Dec_public()
    @tool.Get_form("update_user", "/更新-用户", [{desc: "用户id", key: 'user_id', val: 0, type: Number, required: true}, {desc: "角色ids", key: 'role_ids', val: [], type: String, required: true}, {desc: "电话", key: 'tel', val: "123", type: String, required: true}, {
        desc: "用户名",
        key: 'username',
        val: "111",
        type: String,
        required: true
    },])
    async update_user(@Query() form) {

    }


    @Qgetform("delete_user", "删除_用户", [{desc: "用户id", key: 'user_id', val: 0, type: Number, required: true},])
    async delete_user(@Query() form) {

    }


    @tool.Dec_public()
    @tool.Get_form("find_user_by_depart_id", "/查询_用户_根据部门id", [{desc: "部门id", key: 'depart_id', val: 0, type: Number, required: true}])
    async find_user_by_depart_id(@Query() form) {
        // form.depart_id = Number(form.depart_id)
        // console.log(`form`, form)
        // let depart_list = await db.tb_depart.findMany()
        // let ids = tool.build_tree_ids({list: depart_list, val: form.depart_id, key: "id", ref: "parent_id"})
        // console.log(`111---ids:`, ids)
        // let position = await db.tb_role.findMany({where: {depart_id: {in: ids}}})
        // let position_ids = position.map(o => o.id)
        // console.log(`111---position_ids:`, position_ids)
        // let ref_position_user = await db.role_user.findMany({where: {role_id: {in: position_ids}}})
        // console.log(`111---ref_position_user:`, ref_position_user)
        // let user_ids = ref_position_user.map(o => o.user_id)
        // console.log(`111---user_ids:`, user_ids)
        // let user_list = await db.tb_user.findMany({where: {id: {in: user_ids}}})
        // console.log(`111---user_list:`, user_list)
        //
        // // 查询角色回显
        // let user_list2: any = []
        // for (let i = 0; i < user_list.length; i++) {
        //     let user = user_list[i]
        //     let role_user = await db.role_user.findMany({where: {user_id: user.id}})
        //     let role_ids = role_user.map(o => o.role_id)
        //     let role_list = await db.tb_role.findMany({where: {id: {in: role_ids}}})
        //     let role_uuids = role_list.map(o => o.uuid)
        //     user['role_uuids'] = role_uuids
        //     user_list2.push(user)
        //
        // }
        // console.log(`111---user_list2:`, user_list2)
        return tool.R.ok({msg: "成功/find_user_by_depart_id", result: {user_list: []}})
    }


}



