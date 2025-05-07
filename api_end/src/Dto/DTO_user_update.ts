import {IsArray, IsNotEmpty, IsNumber, IsBoolean, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {DTO_user} from "./DTO_user";

export class DTO_user_update extends DTO_user {

    @ApiProperty({required: false, description: '电话', default: '123456789123', type: String})
    @IsNotEmpty()
    @IsString()
    tel: string = "123456789123";


}


