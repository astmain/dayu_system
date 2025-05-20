import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query, UnauthorizedException, UsePipes, ValidationPipe, Inject} from '@nestjs/common';
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
    constructor(@Inject("db_prisma") private db: any, private jwt_service: JwtService,) {
    }

    @tool.Dec_public()
    @UseFilters(new HttpExceptionFilter())
    @Qgetform("/login", "登陆", [{desc: "电话", key: 'tel', val: "111", type: String, required: true}, {desc: "密码", key: 'password', val: "123456", type: String, required: true}],)
    async login(@Query() form) {
        console.log(`login---tel:`, form)
        // 1.查询用户校验密码
        let user = await this.db.tb_user.findUnique({where: {tel: form.tel}})
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
        let menus_tree = await this.db.tb_menu.findMany({include: {children: true},})
        return tool.R.ok({msg: "成功/login", result: {...user, token, menus_tree}})
    }


    @tool.Get_form("find_permiss_depart_position_tree", "/查询_部门职位树", [])
    async find_permiss_depart_position_tree(@Query() form) {
    }

    @tool.Get_form("find_permiss_menu_tree", "查询_菜单树权限", [{desc: "角色id", key: 'position_id', val: "1", type: Number, required: true}])
    async find_permiss_menu_tree(@Query() form) {

    }

    // 组织=========================================================================================
    @tool.Get_form("depart_create", "新增_组织", [{desc: "组织名称", key: 'depart', val: "", type: String, required: true}, {desc: "父id", key: 'parent_id', val: "", type: Number, required: true}])
    async depart_create(@Query() form) {

    }

    @tool.Get_form("depart_delete", "删除_组织", [{desc: "组织id", key: 'id', val: 0, type: Number, required: true}])
    async delete_depart(@Query() form) {

    }


    @tool.Get_form("depart_update", "更新_组织", [{desc: "组织id", key: 'id', val: 0, type: Number, required: true}, {desc: "组织名称", key: 'name', val: 0, type: String, required: true}])
    async depart_update(@Query() form) {

    }


    // 角色======================================================================================
    @tool.Get_form("role_create", "新增_职位", [{desc: "职位名称", key: 'name', val: "", type: String, required: true}, {desc: "部门id", key: 'id', val: "", type: Number, required: true}])
    async role_create(@Query() form) {

    }

    @tool.Dec_public()
    @ApiOperation({summary: '角色-保存'})
    @Post("/role_save")
    async role_save(@Body() form: DTO_role_id_menu_permiss) {

    }


    @tool.Get_form("role_delete", "删除_角色", [{desc: "职位id", key: 'id', val: 0, type: Number, required: true}])
    async role_delete(@Query() form) {

    }

}

