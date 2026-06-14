import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import helmet from 'helmet';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // security middleware (must be after app creation)
  app.use(helmet());
  app.use(compression());

  // global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // global error handler
  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();