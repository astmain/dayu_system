import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class Dto_user {
    @ApiProperty({description: '用户名', example: 'admin'})
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({description: '密码', example: '123456'})
    @IsNotEmpty()
    @IsString()
    password: string;

}
