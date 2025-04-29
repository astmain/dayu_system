import {Module} from '@nestjs/common';
import controller from './controller';
import service from './service';
import {admin_user} from "./user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";


@Module({
    controllers: [controller],
    imports:[TypeOrmModule.forFeature([admin_user])],
    providers: [service],
    exports: [service],
})
export class manifest {
}


// export default {
//     module: class {
//     }
// }