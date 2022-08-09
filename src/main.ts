import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

(async () => {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.use(cookieParser());
  await app.listen(3000);
})();
