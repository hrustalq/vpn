import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { appConfig } from './_common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: 'http://localhost:5173', credentials: true });
  await app.listen(appConfig.port);
}
bootstrap();
