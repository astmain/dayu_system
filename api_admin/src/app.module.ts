import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
// import {module_user} from './user/module';
// import user from './user/module';
import {module_user} from './user/module';
import {manifest as auth} from './auth/manifest';
import {manifest as book} from './book/manifest';


@Module({
    imports: [module_user, auth, book],//挂载模块
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
