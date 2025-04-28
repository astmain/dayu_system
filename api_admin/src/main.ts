import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {config_docs} from "./config_docs"


async function bootstrap() {
    let app = await NestFactory.create(AppModule)
    let main = config_docs(app)
    await main.app.listen(main.port);

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
