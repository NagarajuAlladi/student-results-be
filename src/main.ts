import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   const swaggerConfig = new DocumentBuilder()
     .setTitle('Student Results API')
     .setDescription('APIS for Student Result')
     .setVersion('1.0')
     .build();

   const doc = SwaggerModule.createDocument(app, swaggerConfig);

   SwaggerModule.setup('api', app, doc);

   app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
