import {IsArray, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class DTO_depart {
    @ApiProperty({description: '部门', default: '', type: String})
    @IsOptional()
    @IsString()
    depart: string ;
}


