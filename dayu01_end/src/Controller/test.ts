import {Controller, Get, Post, Request, Body, Headers, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query, UnauthorizedException, UsePipes, ValidationPipe, Inject} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import util from "../util/index";
import {PrismaClient} from "@prisma/client";
import tool from "../tool";
import {Service_test} from "../Service/Service_test"
import {Service_app} from "../Service/Service_app";
import {DTO_test_pipe} from "../DTO/DTO_test_pipe";
import {DTO_test} from "../DTO/DTO_test";


let db = new PrismaClient()


@ApiTags('测试')
@ApiBearerAuth('Authorization')
@Controller("test")
export class test {
    constructor(
        private readonly __Service_test: Service_test,
        private readonly __Service_app: Service_app,
        @Inject("Service_data") private __Service_data: Object,
        @Inject("Service_factory") private __Service_factory: any,
        @Inject("global_module") private __global_module: any,
    ) {
    }


    @tool.Dec_public()
    @Get("Request")
    async Request(@Request() request) {
        console.log(`111---222:`, request.query)
        console.log(`111---222:`, this.__Service_test.getHello())
        console.log(`111---222:`, this.__Service_data)
        console.log(`111---222:`, this.__Service_data["aaa"])
        this.__Service_data["aaa"] = 123
        console.log(`111---222:`, this.__Service_data)
        console.log(`111---222:`, this.__Service_factory.obj2.getHello())
        console.log(`111---222:`, this.__Service_app.getHello())
        console.log(`111---222:`, this.__global_module.baseUrl)
        return {code: 200}
    }

    @tool.Dec_public()
    @Get("Query")
    async Query(@Query() query, @Headers() header) {
        console.log(`111---query:`, query)
        console.log(`111---header:`, header)
        return {code: 200}
    }

    @tool.Dec_public()
    @Post("Post_Request")
    async Post_Request(@Request() request) {
        console.log(`111---222:`, request.body)
        return {code: 200}
    }


    @tool.Dec_public()
    @Post("test_login")
    async test_login(@Body(DTO_test_pipe) body: DTO_test) {
        console.log(`111---body:`, body)
        return tool.R.ok({msg: "成功/test_login", result: {}})
    }


}
