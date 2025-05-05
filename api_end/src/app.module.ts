import {Module} from '@nestjs/common';
import {Module_auth} from './auth/Module_auth';

import {Module_test} from './test/Module_test';

import {__menu} from './Module/menu';
import {__user} from './Module/user';
import {__role} from './Module/role';
import {__auth} from './Module/auth';
import {__depart} from './Module/depart';


@Module({
    //挂载模块
    imports: [
        Module_test,
        __menu,
        __user,
        __role,
        // Module_auth,
        __auth,
        __depart,

    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
