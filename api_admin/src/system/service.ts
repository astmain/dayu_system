import {Injectable} from '@nestjs/common';

@Injectable()
class service {
    get_hello(): string {
        return 'Hello World!';
    }
}


export default service
