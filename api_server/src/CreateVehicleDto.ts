import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsBoolean, } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({ description: '车辆名称' })
  @IsNotEmpty({ message: '名称不能为空' })
  @IsString()
  name: string;

  @ApiProperty({
    description: '驱动模式',
    required: false,
    example: 1,
  })
  @IsInt()
  drive_mode: number;

  @ApiProperty({ description: '是否保留' })
  @IsBoolean()
  reserved: boolean;
}