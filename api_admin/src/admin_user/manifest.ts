import {Module} from '@nestjs/common';
import Controller_admin_user from './Controller_admin_user';
import service from './User_service';
import {admin_user} from "./user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";


@Module({
    controllers: [Controller_admin_user],
    imports: [TypeOrmModule.forFeature([admin_user])],
    providers: [service],
    exports: [service],
})
export class manifest {
}


// export default {
//     module: class {
//     }
// }