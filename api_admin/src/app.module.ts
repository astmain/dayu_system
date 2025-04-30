import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
// import {module_user} from './user/module';
// import user from './user/module';
import {module_user} from './user/module';
// 测试开发
import {manifest as admin_user} from './admin_user/manifest';
import {manifest as auth} from './auth/manifest';
import {manifest as book} from './book/manifest';
import orm_type from './orm_type';


@Module({
    //挂载模块
    imports: [
        // 测试开发和orm_type========================
        orm_type,
        // 正规开发=================================
        auth,
        admin_user,
        module_user,
        book,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
