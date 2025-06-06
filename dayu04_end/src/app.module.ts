import {Module, Global} from '@nestjs/common';

// 路由模块
import {__test} from './Module/test';
import {__auth} from './Module/auth';
import {__depart} from './Module/depart'
import {__user} from './Module/user'
import {__role} from './Module/role'
import {__menu} from './Module/menu'
import {__mall_order} from './Module/mall_order'


//测试模块
import {appController} from './app.Controller'
import {Service_test} from './Service/Service_test'
import {Service_app} from './Service/Service_app'

//全局模块
import {global_module} from "./Module/global_module";
// import {orm} from "./Module/orm";
import {db_prisma} from "./db_orm_prisma/db_prisma";
import {db_all} from "./db_orm_prisma/db_all";

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
        __mall_order,
        // 资源文件模块
        __static_file,
        //
        //     全局模块,
        global_module.make_path({path: "/app.json"}),
        db_prisma.make_path({path: "/app.json"}),
        db_all.make_path({path: "/app.json"}),


    ],
    controllers: [appController],
    providers: [Service_app, Service_test],
    exports: [Service_app, Service_test],


})
export class AppModule {
}
