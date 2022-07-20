import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { AppConfigModule } from '../app-config/app-config.module';
import { HealthService } from './health.service';
import { LoggerModule } from '../logger/logger.module';
import { AppConfigService } from '../app-config/app-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TerminusModule,
    AppConfigModule,
    LoggerModule,
    AppConfigModule,
    ConfigModule,
  ],
  controllers: [HealthController],
  providers: [HealthService, AppConfigService],
})
export class HealthModule {}
