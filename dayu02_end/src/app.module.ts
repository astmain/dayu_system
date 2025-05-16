import {Module, Global} from '@nestjs/common';

// 路由模块
import {__test} from './Module/test';
import {__auth} from './Module/auth';
import {__depart} from './Module/depart'
import {__user} from './Module/user'
import {__role} from './Module/role'
import {__menu} from './Module/menu'


//测试模块
import {appController} from './app.Controller'
import {Service_test} from './Service/Service_test'
import {Service_app} from './Service/Service_app'

//全局模块
import {global_module} from "./Module/global_module";

// 资源文件模块
import {__static_file} from "./Module/static_file";


@Module({

    imports: [
        //测试模块
        __test,

        __auth,
        __depart,
        __user,
        __role,
        __menu,
        // 资源文件模块
        __static_file,
        //
        //     全局模块,
        global_module.make_path({path: "/app.json"}),


    ],
    controllers: [appController],
    providers: [Service_app, Service_test],
    exports: [Service_app, Service_test],


})
export class AppModule {
}
