import {IsArray, IsNotEmpty, IsString} from "class-validator";

export class DTO_role {
    @IsString()
    @IsNotEmpty()
    role: string;

    @IsString()
    @IsNotEmpty()
    remark: string;

    @IsArray()
    menu_chooseed: [];
}


