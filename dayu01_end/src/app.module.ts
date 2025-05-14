import {Module} from '@nestjs/common';


import {__auth} from './Module/auth';
import {__depart} from './Module/depart'
import {__user} from './Module/user'
import {__role} from './Module/role'
import {__menu} from './Module/menu'
@Module({
    //挂载模块
    imports: [

        __auth,
        __depart,
        __user,
        __role,
        __menu,

    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
