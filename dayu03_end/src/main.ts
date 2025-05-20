import {NestFactory} from '@nestjs/core'

import {NestExpressApplication} from '@nestjs/platform-express'
import { join } from 'path'

// 自定义
import {AppModule} from './app.module'
import {config_docs} from "./config_docs"
import {Config_logger_global_middleware} from "./Config_logger_global_middleware"
import {Config_filter_response} from "./Config_filter_response"
import {Config_filter_catch_error} from "./Config_filter_catch_error"

async function bootstrap() {
    let app_http = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true})
    app_http.useStaticAssets(join(__dirname,  'static'),{prefix:"/static"})   //      http://127.0.0.1:3000/static/1747306430929.png
    let main = config_docs(app_http, 30001)
    main.app.use(Config_logger_global_middleware)
    main.app.useGlobalInterceptors(new Config_filter_response())
    main.app.useGlobalFilters(new Config_filter_catch_error())
    await main.app.listen(main.port);


    // 使用证书
    // const httpApp = await NestFactory.create(AppModule, {cors: true});
    // const httpsApp = await NestFactory.create(AppModule, {cors: true, httpsOptions});
    // await httpApp.listen(3000); // http service
    // await httpsApp.listen(4000); // https service


}

void bootstrap();
console.log(`
      启动成功
      http://127.0.0.1:30001/
      http://127.0.0.1:30001/index
      http://localhost:30001/api/swagger
      http://127.0.0.1:30001/doc.html
    `);
// http://127.0.0.1:3000/docs
