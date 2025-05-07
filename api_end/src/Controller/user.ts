import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';

// 自定义
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";
import {Dec_public} from "../auth/Dec_public";
import {PrismaClient} from "@prisma/client";
import util from "../util/index";
import {DTO_role} from "../Dto/DTO_role";
import {DTO_user} from "../Dto/DTO_user";
import  * as Dto from "../Dto/Dto";
import get_menus_flat_by_role_id from "../util/make_menus_flat_by_role_id";
import {DTO_depart} from "../Dto/DTO_depart";
import {DTO_user_update} from "../Dto/DTO_user_update";

let db = new PrismaClient()


@ApiTags('用户管理')
@ApiBearerAuth('Authorization')
@Controller("user")
export class user {
    @ApiOperation({summary: '新增用户'})
    @UseFilters(new HttpExceptionFilter())
    @Post("/add")
    async add(@Body() data) {
        console.log(`add---data:`, data)
        let tb = {tel: data.tel, username: data.username}
        let one1 = await db.tb_user.create({data: tb})
        let one2 = await db.depart_user.create({data: {depart_id: data.depart_id, user_id: one1.id}})
        console.log(`add---one1:`, one1)
        console.log(`add---one2:`, one2)
        return {code: 200, msg: '成功/add ', result: {one1, one2}};
    }

    @Post("/delete")
    @ApiOperation({summary: '删除'})
    @UseFilters(new HttpExceptionFilter())
    async delete(@Body() data: DTO_user) {
        console.log(`delete---data:`, data)
        const one = await db.tb_user.delete({where: {id: data.id}})
        return {code: 200, msg: '成功/delete', result: {one}};
    }


    @ApiOperation({summary: '更新用户'})
    @Get("/update")
    update(@Body() data: DTO_user_update) {
        console.log(`111---data:`, data)
        return {code: 200, msg: '成功/update', result: 111};
    }


    @ApiOperation({summary: '查询用户-详情-包含部门'})
    @Post("/find_user_info_depart")
    async find_user_info(@Body() data: DTO_user) {
        // 查询用户
        const user = await db.tb_user.findMany({where: {id: data.id}})
        console.log(`1-1---user:`, user)

        // 查询部门关联用户
        const depart_user = await db.depart_user.findMany({where: {user_id: data.id}})
        console.log(`1-2---depart_user:`, depart_user)

        //查询部门
        const tb_depart = await db.tb_depart.findMany()
        console.log(`1-3---tb_depart:`, tb_depart)

        //遍历得到当前用户的部门关系
        let opt_val: any = []
        for (let i = 0; i < depart_user.length; i++) {
            let ref = depart_user[i]
            opt_val.push( util. build_user_depart_opt_val(ref.depart_id, tb_depart))
        }
        console.log(`1-4---opt_val:`, opt_val)


        // 部门树
        let opt_list = util.build_departs_tree(tb_depart)
        console.log(`2-1---opt_list:`,     opt_list        )




        return {code: 200, msg: '成功/update', result: {opt_val,opt_list}};
    }


}