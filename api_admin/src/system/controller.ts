import {Controller, Get, Post, Body} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';

import service from "./service"


console.log(`

http://127.0.0.1:3000/system/index
`)

@ApiTags('权限管理')
@ApiBearerAuth('Authorization')
@Controller("system")
export class controller {
    constructor(private readonly service: service) {
    }


    @Get("/get_hello")
    @ApiOperation({summary: 'get_hello'})
    index(): Object {
        console.log(`111---get_hello:`, this.service.get_hello())
        return {code: 200, msg: '成功/index', result: 111};
    }
}
