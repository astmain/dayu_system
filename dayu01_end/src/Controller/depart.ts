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


@ApiTags('部门管理')
@ApiBearerAuth('Authorization')
@Controller("depart")
export class depart {

    @tool.Dec_public()
    @Qgetform("find_departs_tree", "/得到_部门树", [])
    async find_departs_tree(@Query() form) {
        console.log(`form`, form)

        // let departs = await db.tb_depart.findMany({where: {depart: {contains: data.depart}}})
        let tb_depart = await db.tb_depart.findMany()


        let departs_tree=tool.build_tree({ arr: tb_depart, key_id: 'depart_id', key_parent: 'parent_id' })
        // build_tree({ arr: tb_depart, key_id: 'depart_id', key_parent: 'parent_id' })
        return tool.R.ok({msg: "成功", result: {departs_tree}})
    }

}



