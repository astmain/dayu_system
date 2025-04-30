// 视频教程      https://www.bilibili.com/video/BV1JViRYJEGH?p=33
// 官方文档      https://docs.nestjs.cn/9/security?id=认证（authentication）


import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "./public.decorator";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {

    }


    // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
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
        console.log(`AuthGuard---request:`, request)
        console.log(`AuthGuard---token:`, token)


        return false;
    }

}


function extractTokenFromHeader(request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : '';
}

