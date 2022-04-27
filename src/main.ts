import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  //Disable SSL
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  await app.listen(3000);
}
bootstrap();
