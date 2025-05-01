import {Module} from '@nestjs/common';
import {Controller_auth} from './Controller_auth';
import {Service_auth} from './Service_auth';


@Module({
    controllers: [Controller_auth],
    providers: [Service_auth],
})
export class Module_auth {
}


// export default {
//     module: class {
//     }
// }