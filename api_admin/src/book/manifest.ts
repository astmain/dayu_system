import {Module} from '@nestjs/common';
import controller from './controller';
import service from './service';


@Module({
    controllers: [controller],
    providers: [service],
})
export class manifest {
}


// export default {
//     module: class {
//     }
// }