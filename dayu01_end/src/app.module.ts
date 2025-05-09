import {Module} from '@nestjs/common';


import {__auth} from './Module/auth';
import {__depart} from './Module/depart'
import {__user} from './Module/user'
@Module({
    //挂载模块
    imports: [

        __auth,
        __depart,
        __user,

    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
