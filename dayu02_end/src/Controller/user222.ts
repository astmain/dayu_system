import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ParseArrayPipe} from '@nestjs/common/pipes/parse-array.pipe';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";
import {PrismaClient} from "@prisma/client";
import tool from "../tool";
import {Qgetform} from "../util/Qgetform";
import {DTO_role_id_menu_permiss} from "../DTO/DTO_role_id_menu_permiss";
import {DTO_user_create} from "../DTO/DTO_user_create";


let db = new PrismaClient()


@ApiTags('用户管理')
@ApiBearerAuth('Authorization')
@Controller("user")
export class user {

    @Qgetform("find_user_list", "查找_用户列表", [])
    async find_user_list(@Query() form) {
        console.log(`form`, form)
        // let departs = await db.tb_depart.findMany({where: {depart: {contains: data.depart}}})
        let user_list = await db.tb_user.findMany()
        console.log(`111---user_list:`, user_list)
        return tool.R.ok({msg: "成功", result: {user_list}})
    }

    @tool.Dec_public()
    @tool.Get_form("create_user", "/新增用户", [{desc: "职位uuid_list", key: 'position_uuid_list', val: [], type: String, required: true}, {desc: "电话", key: 'tel', val: "123", type: String, required: true}, {desc: "用户名", key: 'username', val: "111", type: String, required: true},])
    async create_user(@Query() form) {
        form.position_uuid_list = JSON.parse(form.position_uuid_list)
        console.log(`create_user---form:`, form)
        let one = await db.tb_user.findUnique({where: {tel: form.tel}})
        console.log(`111---one:`, one)
        if (one) return tool.R.err({msg: "失败:手机号码已经被其他用户注册", result: {}})
        let user = await db.tb_user.create({data: {username: form.username, tel: form.tel}})
        console.log(`111---user:`, user)
        for (let i = 0; i < form.position_uuid_list.length; i++) {
            let uuid = form.position_uuid_list[i]
            let ref_position = await db.ref_position.findFirst({where: {uuid: uuid}})
            let one_position_user = await db.ref_position_user.create({data: {user_id: user.id, position_id: ref_position?.id || 0}})
            console.log(`111---one_position_user:`, one_position_user)
        }
        return tool.R.ok({msg: "成功/create_user", result: {}})
    }


    @Qgetform("delete_user", "删除_用户", [{desc: "用户id", key: 'user_id', val: 0, type: Number, required: true},])
    async delete_user(@Query() form) {
        form.user_id = Number(form.user_id)
        console.log(`111---form:`, form)
        await db.tb_user.deleteMany({where: {id: form.user_id}})
        await db.ref_position_user.deleteMany({where: {id: form.user_id}})
        return tool.R.ok({msg: "成功/delete_user", result: {}})
    }


    @tool.Dec_public()
    @tool.Get_form("find_user_by_depart_id", "/查询_用户_根据部门id", [{desc: "部门id", key: 'depart_id', val: 0, type: Number, required: true}])
    async find_user_by_depart_id(@Query() form) {
        form.depart_id = Number(form.depart_id)
        console.log(`form`, form)
        let ref_position = await db.ref_position.findMany({where: {depart_id: form.depart_id}})
        console.log(`111---ref_position:`, ref_position)
        let position_id_list = ref_position.map(o => o.id)
        console.log(`222---position_id_list:`, position_id_list)
        let ref_position_user = await db.ref_position_user.findMany({where: {position_id: {in: position_id_list}}})
        let user_id_list = ref_position_user.map(o => o.user_id)
        console.log(`333---user_id_list:`, user_id_list)
        let user_list = await db.tb_user.findMany({where: {id: {in: user_id_list}}})
        console.log(`111---user_list:`, user_list)
        return tool.R.ok({msg: "成功/find_user_by_depart_id", result: {user_list}})
    }


}



