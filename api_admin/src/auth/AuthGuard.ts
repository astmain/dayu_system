// 视频教程      https://www.bilibili.com/video/BV1JViRYJEGH?p=33
// 官方文档      https://docs.nestjs.cn/9/security?id=认证（authentication）


import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "./public.decorator";
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
        const request = context.switchToHttp().getRequest();
        const token = extractTokenFromHeader(request);
        // console.log(`AuthGuard---request:`, request)
        console.log(`AuthGuard---token:`, token)
        if (!token) {
            console.log(`AuthGuard---token---空:`, token)
            throw new UnauthorizedException()
        }


        try {
            let payload = await this.jwt_service.verifyAsync(token, {secret: const_jwt.secret,})
            console.log(`AuthGuard---payload:`, payload)
            request["user"] = payload
        } catch (error) {
            throw new UnauthorizedException()
        }


        return true;//放行
    }

}


function extractTokenFromHeader(request) {
    // const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // return type === 'Bearer' ? token : '';


    const token = request.headers?.token
    console.log(`111---token:`, token)
    return token;

    // if (token){
    //
    // }else{
    //     throw  new UnauthorizedException()
    // }


}

