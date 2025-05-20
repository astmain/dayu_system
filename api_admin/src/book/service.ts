import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

@Injectable()
export default class Service {
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
