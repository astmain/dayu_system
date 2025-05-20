import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
// 引入数据orm连接注入service
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";
import {admin_user} from "./user.entity";
import {dto_create} from './dto_create';


@Injectable()
export default class User_service {
    constructor(
        @InjectRepository(admin_user)
        private readonly usersRepository: Repository<admin_user>,
    ) {
    }


    findOne(id: number): Promise<admin_user | null> {
        return this.usersRepository.findOneBy({id});
    }

    findAll(): Promise<admin_user[]> {
        return this.usersRepository.find();
    }


    create(dto_create: dto_create): Promise<admin_user> {
        // todo 数据操作异常需要做异常处理
        const user = new admin_user();
        user.username = dto_create.username;
        user.password = dto_create.password;
        user.nickname = dto_create.nickname || dto_create.username;
        user.role = dto_create.role;
        user.avatar = dto_create.avatar;
        user.active = 1;
        return this.usersRepository.save(user);
    }

    delete(id: number): Promise<DeleteResult> {
        return this.usersRepository.delete(id);
    }


    findByUsername(username) {
        return this.usersRepository.findOneBy({username});
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
