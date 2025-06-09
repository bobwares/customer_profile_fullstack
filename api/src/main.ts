// App: Client Profile Module
// Package: api
// File: main.ts
// Version: 0.0.11
// Author: Bobwares
// Date: 2025-06-08T10:00:00Z
// Description: Entry point for the NestJS application.

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();
  await app.listen(3001);
}

bootstrap();
