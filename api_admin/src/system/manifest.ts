import {Module} from '@nestjs/common';
import {controller} from './controller';
import service from './service';

@Module({
    imports: [],
    controllers: [controller],
    providers: [service],
})

export default class manifest {
}


// manifest.development