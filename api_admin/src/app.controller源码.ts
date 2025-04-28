import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
@ApiTags('home') // 控制器分类
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Hello' })
  @ApiResponse({ status: 200, description: 'Hello测试' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/index')
  @ApiOperation({ summary: 'index' })
  @ApiResponse({ status: 200, description: 'index测试' })
  index(): Object {
    return { code: 200, msg: '成功', result: 111 };
  }

  @Get()
  @ApiOperation({ summary: '获取所有猫' })
  @ApiResponse({ status: 200, description: '成功返回猫列表' })
  findAll() {
    return ['Tom', 'Kitty'];
  }
}
