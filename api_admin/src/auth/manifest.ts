import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';


import {APP_GUARD} from "@nestjs/core";

import Controller_Auth from './Controller_Auth';
import service from './Service_auth';
import {AuthGuard} from './AuthGuard';


import {manifest as manifest_admin_user} from '../admin_user/manifest';


@Module({
    imports: [manifest_admin_user, JwtModule.register({
        global: true,
        secret: "abcdefg",//私钥
        signOptions: {expiresIn: 24 * 60 * 60 * 30 + 's'}, //24小时*30天
    })],
    controllers: [Controller_Auth],
    providers: [
        service,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        }
    ],
})
export class manifest {
}


// export default {
//     module: class {
//     }
// }