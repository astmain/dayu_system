import {Module} from '@nestjs/common';
import {Module_auth} from './auth/Module_auth';
import {Module_test} from './test/Module_test';



@Module({
    //挂载模块
    imports: [
        Module_auth,
        Module_test,
    ],
    controllers: [],
    providers: [

    ],
})
export class AppModule {
}
