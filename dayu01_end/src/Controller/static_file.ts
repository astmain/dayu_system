import {Controller, Get, Post, Request, Body, Headers, HttpException, UseInterceptors, UploadedFile, HttpStatus, UseFilters, ParseIntPipe, Query, UnauthorizedException, UsePipes, ValidationPipe, Inject, Res} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
import {join} from 'path';
// import {zip} from 'compressing'
import {FileInterceptor} from '@nestjs/platform-express' //单文件上传
import type { Response } from 'express'
// 自定义
import util from "../util/index";
import {PrismaClient} from "@prisma/client";
import tool from "../tool";


let db = new PrismaClient()


@ApiTags('上传资源')
@ApiBearerAuth('Authorization')
@Controller("upload")
export class static_file {
    constructor() {
    }

    @ApiOperation({summary: '单文件上传'})
    @tool.Dec_public()
    @UseInterceptors(FileInterceptor("file"))//单文件上传
    @Post("/upload_one")
    async upload_one(@UploadedFile() file) {
        console.log(`111---file:`, file)
        return {code: 200}
    }

    @ApiOperation({summary: '多文件上传-等待开发'})
    @tool.Dec_public()
    @Post("/upload_many")
    async upload_many(@UploadedFile() file) {
        console.log(`111---file:`, file)
        return {code: 200}
    }


    @ApiOperation({summary: '文件下载'})
    @tool.Dec_public()
    @Get("/download")
    async download(@Res() res: Response) {
        let url = join(__dirname, "../static/png.png")
        res.download(url)
        return {code: 200}
    }


    @ApiOperation({summary: '文件下载流-等待开发'})
    @tool.Dec_public()
    @Post("/download_stream")
    async download_stream() {

        return {code: 200}
    }


}
