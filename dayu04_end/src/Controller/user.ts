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

    }

    @tool.Dec_public()
    @tool.Get_form("create_user", "/新增用户", [{desc: "职位ids", key: 'position_ids', val: [], type: String, required: true}, {desc: "电话", key: 'tel', val: "123", type: String, required: true}, {desc: "用户名", key: 'username', val: "111", type: String, required: true},])
    async create_user(@Query() form) {


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

    }


}



