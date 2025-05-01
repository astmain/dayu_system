import {Module} from '@nestjs/common';
import {Controller_auth} from './Controller_auth';
import {Service_auth} from './Service_auth';
import {const_jwt} from "./const_jwt";
import {JwtModule} from "@nestjs/jwt";


@Module({
    imports: [
        JwtModule.register({global: true, secret: const_jwt.secret, signOptions: const_jwt.signOptions}),//jwt//私钥//24小时*30天
    ],
    controllers: [Controller_auth],
    providers: [Service_auth],
})
export class Module_auth {
}


// export default {
//     module: class {
//     }
// }