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
import build_departs_tree from "../tool/build_departs_tree";

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



}



