import {Module} from '@nestjs/common';


import {__auth} from './Module/auth';


@Module({
    //挂载模块
    imports: [

        __auth,

    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
