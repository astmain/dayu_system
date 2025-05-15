import {Controller, Get, Post, Request, Body, Headers, HttpException, UseInterceptors, UploadedFile, HttpStatus, UseFilters, ParseIntPipe, Query, UnauthorizedException, UsePipes, ValidationPipe, Inject} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';


import {FileInterceptor} from '@nestjs/platform-express' //单文件上传
// 自定义
import util from "../util/index";
import {PrismaClient} from "@prisma/client";
import tool from "../tool";


let db = new PrismaClient()


@ApiTags('上传资源')
@ApiBearerAuth('Authorization')
@Controller("upload")
export class upload {
    constructor() {
    }


    @tool.Dec_public()
    @UseInterceptors(FileInterceptor("file"))//单文件上传
    @Post("one")
    async one(@UploadedFile() file) {
        console.log(`111---file:`, file)
        return {code: 200}
    }


}
