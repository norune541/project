import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, StandardSchemaValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(bootstrap.name);

  const config = app.get(ConfigService);
  const port = config.getOrThrow<number>('PORT');

  // Security
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new StandardSchemaValidationPipe());

  // Global prefix
  app.setGlobalPrefix('/api');

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(port);

  logger.log(`Application is running on: http://localhost:${port}/api`);
  logger.log(`Swagger documentation: http://localhost:${port}/docs`);
}

await bootstrap();
