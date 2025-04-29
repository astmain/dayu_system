import {Controller, Get, Post, Body} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
import {CreateVehicleDto} from './CreateVehicleDto';
// import aaa from "../prisma/tb_account"

// tb_user = require("../prisma/tb_user");
let tb_user = require("../prisma/tb_user.js");

// import tb_user from '../prisma/tb_user.js';
import {AppService} from "./app.service";

@ApiTags('测试接口')
@ApiBearerAuth('Authorization')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
    @Get("")
    @ApiOperation({summary: ''})
    async local() {

        // console.log(`tb_account---find_all:`, await tb_user.find_all())
        // console.log(`111---222:`,     tb_user.find_all()      )
        return {code: 200, msg: '成功', result: 111};
    }

    @Get("/index")
    @ApiOperation({summary: 'index'})
    index(): Object {
        return {code: 200, msg: '成功/index', result: 111};
    }
}
