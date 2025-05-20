import {Controller, Get, Post, Request, Body, Headers, HttpException, UseInterceptors, UploadedFile, HttpStatus, UseFilters, ParseIntPipe, Query, UnauthorizedException, UsePipes, ValidationPipe, Inject, Res} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
import {extname, join} from 'path';
// import {zip} from 'compressing'
import {FileInterceptor} from '@nestjs/platform-express' //单文件上传
import type {Response} from 'express'
import {diskStorage} from 'multer';
// 自定义
import util from "../util/index";
import {PrismaClient} from "@prisma/client";
import tool from "../tool";


let db = new PrismaClient()


@ApiTags('上传资源')
@ApiBearerAuth('Authorization')
@Controller("static_file")
export class static_file {
    constructor() {
    }

    @tool.Dec_public()
    @ApiOperation({summary: '单文件上传'})
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            // 指定文件存储路径
            destination: './src/static',
            // 指定文件名
            filename: (req, file, callback) => {
                // 生成文件名: 时间戳 + 随机数 + 原文件扩展名
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
            },
        }),
        // 文件过滤器
        fileFilter: (req, file, callback) => {
            // 这里可以添加文件类型限制
            // 例如只允许上传图片
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return callback(new Error('只允许上传图片文件!'), false);
            }
            callback(null, true);
        },
    }))//单文件上传
    @Post("/upload_one")
    async upload_one(@UploadedFile() file) {
        console.log(`111---file:`, file)
        return tool.R.ok({msg: "成功/upload_one", result: {}})
    }

    @ApiOperation({summary: '多文件上传-等待开发'})
    @tool.Dec_public()
    @Post("/upload_many")
    async upload_many(@UploadedFile() file) {
        console.log(`111---file:`, file)
        return {code: 200, result: "111"}
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
