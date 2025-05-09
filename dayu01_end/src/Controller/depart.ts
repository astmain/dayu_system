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
            let user_list = await db.tb_user.findMany({where: {id: {notIn: notIn_user_ids}}})
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

}



