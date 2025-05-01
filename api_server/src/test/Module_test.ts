import {Module} from '@nestjs/common';
import {Controller_test} from './Controller_test';
import {Service_test} from './Service_test';


@Module({
    controllers: [Controller_test],
    providers: [Service_test],
})
export class Module_test {
}


// export default {
//     module: class {
//     }
// }