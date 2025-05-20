import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {config_docs} from "./config_docs"


async function bootstrap() {
    let app_http = await NestFactory.create(AppModule, {cors: true})
    let main = config_docs(app_http, 3000)
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
      http://127.0.0.1:3000/
      http://127.0.0.1:3000/index
      http://localhost:3000/api/swagger
      http://127.0.0.1:3000/doc.html
    `);
// http://127.0.0.1:3000/docs
