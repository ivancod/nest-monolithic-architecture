import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseTransformMiddleware } from './middlewares/response-transform.middleware';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Глобальные пайпы
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // Глобальные фильтры
  app.useGlobalFilters(new HttpExceptionFilter());

  // Глобальные middleware
  app.use(ResponseTransformMiddleware);

  await app.listen(3000);
}
bootstrap();
