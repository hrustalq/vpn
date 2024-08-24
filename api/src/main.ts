import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { appConfig } from './_common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: appConfig.origin });
  await app.listen(appConfig.port);
}
bootstrap();
