import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {knife4jSetup} from 'nest-knife4j';

const PORT = 3000;
const NAME = 'nest-swagger-demo';
const VERSION = '1.0.0';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    const options = new DocumentBuilder()
        // .addBearerAuth(
        //   {
        //     type: 'http',
        //     scheme: 'bearer',
        //     bearerFormat: 'JWT',
        //     name: 'Authorization',
        //     description: 'Enter JWT token',
        //     in: 'header',
        //   },
        //   'Authorization',
        // )
        .setTitle(NAME)
        .setDescription(`${NAME}-${VERSION} API description`)
        .setVersion(VERSION)
        .addServer(`http://localhost:${PORT}/`, 'Local environment')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api/swagger', app, document);
    knife4jSetup(app, [
        {
            name: NAME,
            url: `/api/swagger-json`,
            swaggerVersion: VERSION,
            location: `/api/swagger-json`,
        },
    ]);

    await app.listen(PORT);

    console.log(
        `nest-swagger-demo is running at http://localhost:${PORT}; 
     swagger Doc running at http://localhost:${PORT}/api/swagger; 
     knife4j Doc running at http://localhost:${PORT}/doc.html;`,
    );

    console.log(`
  启动成功
  http://127.0.0.1:3000/
  http://localhost:3000/api/swagger
  http://127.0.0.1:3000/docs
  http://127.0.0.1:3000/doc.html

`);
}

void bootstrap();
