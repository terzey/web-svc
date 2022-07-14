import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { ConfigModule } from '@nestjs/config';
import { HealthService } from './health.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot({ cache: true }),
    LoggerModule,
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
