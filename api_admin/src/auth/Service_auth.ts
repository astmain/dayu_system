import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import User_service from "../admin_user/User_service";
import * as md5 from "md5";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export default class Service_auth {


    constructor(
        private user_service: User_service,
        private jwt_service: JwtService,
    ) {
    }

    async login(username, password) {
        console.log(`login---username:`, username, password)
        let user = await this.user_service.findByUsername(username);
        let md5_password = md5(password).toUpperCase()
        console.log(`login---md5_password:`, md5_password) //todo 数据库密码方案使用md5加密
        if (user?.password !== password) {
            throw new UnauthorizedException()
        }

        const payload = {username: user?.username, id: user?.id, role: user?.role};
        const token = await this.jwt_service.signAsync(payload)
        return {...user, token}


    }


    getHello(): string {
        return 'Hello World!';
    }

    get_data(params): string {
        if (!params?.id && !Number.isInteger(params?.id)) {
            // throw new HttpException("AppService---参数错误---get_data", HttpStatus.FORBIDDEN)
            throw new HttpException({status: HttpStatus.FORBIDDEN, error: 'AppService---参数错误---get_data',}, HttpStatus.FORBIDDEN);
            // throw new HttpException({status: HttpStatus.FORBIDDEN, error: 'AppService---参数错误---get_data',}, HttpStatus.FORBIDDEN);


        }
        return `get_data---params.id`
    }
}
