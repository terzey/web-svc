import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { LoggerService } from './logger/logger.service';
import { LoggerModule } from './logger/logger.module';
import { MetricsModule } from './metrics/metrics.module';
import { MetricsMiddleware } from './common/middleware/metrics.middleware';
import { AppConfigService } from './app-config/app-config.service';
import { DebugMiddleware } from './common/middleware/debug.middleware';
import { AppConfigModule } from './app-config/app-config.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HealthModule,
    LoggerModule,
    MetricsModule,
    ConfigModule.forRoot({ cache: true }),
    AppConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService, AppConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(MetricsMiddleware).forRoutes('*');
    consumer.apply(DebugMiddleware).forRoutes('/api');
  }
}
