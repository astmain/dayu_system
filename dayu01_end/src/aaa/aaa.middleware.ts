import {Injectable, NestMiddleware} from '@nestjs/common';


import {Request, Response, NextFunction} from "express"

@Injectable()
export class AaaMiddleware implements NestMiddleware {
    // use(req: TRequest, res: TResponse, next: (error?: any) => void): any;
    // use(req: any, res: any, next: () => void) {
    use(req: Request, res: Response, next: NextFunction) {
        next();
    }
}
