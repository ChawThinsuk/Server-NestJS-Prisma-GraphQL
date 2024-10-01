import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './demo-graphql/helper/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  // app.useGlobalFilters(new GraphqlExceptionFilter());

  await app.listen(3000);
}
bootstrap();
