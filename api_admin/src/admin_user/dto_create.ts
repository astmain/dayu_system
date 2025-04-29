import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class dto_create {
    @ApiProperty({description: '用户名', example: '张三'})
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({description: '密码', example: '123456'})
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({description: '角色', example: 'admin'})
    @IsNotEmpty()
    @IsString()
    role: string;

    @ApiProperty({description: '昵称', example: '小张'})
    @IsNotEmpty()
    @IsString()
    nickname: string;

    @ApiProperty({description: '头像', example: 'https://gitee.com/astmain/static/raw/master/avatar/pikaqiu_01.jpg'})
    @IsNotEmpty()
    @IsString()
    avatar: string;
}
