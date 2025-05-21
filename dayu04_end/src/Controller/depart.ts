import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ParseArrayPipe} from '@nestjs/common/pipes/parse-array.pipe';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";
import {PrismaClient} from "@prisma/client";
import tool from "../tool";
import {json} from "express";


let db = new PrismaClient()


@ApiTags('部门管理')
@ApiBearerAuth('Authorization')
@Controller("depart")
export class depart {
    @tool.Dec_public()
    @tool.Get_form("find_departs_tree", "/查询_部门树", [{desc: "部门id", key: 'id', val: 0, type: Number, required: true}])
    async find_departs_tree(@Query() form) {

    }









}



