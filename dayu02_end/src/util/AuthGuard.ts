// 视频教程      https://www.bilibili.com/video/BV1JViRYJEGH?p=33
// 官方文档      https://docs.nestjs.cn/9/security?id=认证（authentication）


import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "./Dec_public";
import {JwtService} from "@nestjs/jwt";
import {const_jwt} from "./const_jwt";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector,
                private jwt_service: JwtService,
    ) {

    }


    // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // console.log(`111---context:`, context)
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // 开发即可注解
        if (isPublic) {
            return true;
        }
        // 得到网络求对象request
        const request = context.switchToHttp().getRequest();
        const token = request.headers?.token?.replace(/\s/g, '')
        // console.log(`AuthGuard---request:`, request)
        console.log(`AuthGuard---token:`, token)
        // 判断token是否存在
        if (!token) {
            // console.log(`AuthGuard---token---空:`, token)
            throw new UnauthorizedException()
        }

        // 解析token得到user信息
        try {
            let payload = await this.jwt_service.verifyAsync(token, {secret: const_jwt.secret,})
            // console.log(`AuthGuard---payload:`, payload)
            // 请求全局参数   @Req() request   调用   request["user"]
            request["user"] = payload
        } catch (error) {
            throw new UnauthorizedException()
        }

        //放行
        return true;
    }
}
