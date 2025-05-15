import {Module, Global} from '@nestjs/common';


@Global()
@Module({
    //挂载模块
    imports: [],

    providers: [
        {provide: "global_module", useValue: {baseUrl: "/v1"}},
    ],
    exports: [
        {provide: "global_module", useValue: {baseUrl: "/v1"}},


    ],


})
export class global_module {
}
