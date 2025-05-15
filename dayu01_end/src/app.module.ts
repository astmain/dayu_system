import {Module, Global} from '@nestjs/common';

import {__test} from './Module/test';
import {__auth} from './Module/auth';
import {__depart} from './Module/depart'
import {__user} from './Module/user'
import {__role} from './Module/role'
import {__menu} from './Module/menu'

//
import {appController} from './app.Controller'
import {Service_test} from './Service/Service_test'
import {Service_app} from './Service/Service_app'

//
import {global_module} from "./Module/global_module";



@Module({
    //挂载模块
    imports: [
        __test,
        __auth,
        __depart,
        __user,
        __role,
        __menu,
    //
        global_module


    ],
    controllers: [appController],
    providers: [Service_app, Service_test],
    exports : [Service_app,Service_test],


})
export class AppModule {
}
