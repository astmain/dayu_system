import {Module} from '@nestjs/common';
import {Controller_user} from './Controller_user';
import {Service_user} from './Service_user';


@Module({
    controllers: [Controller_user],
    providers: [Service_user],
})
export class Module_user {
}


// export default {
//     module: class {
//     }
// }