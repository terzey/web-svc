import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import {
  makeGaugeProvider,
  makeSummaryProvider,
  makeCounterProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';
import {
  Build,
  HttpRequestDurationSeconds,
  HttpRequestCountTotal,
  MemoryLimitBytes,
  MemoryBytes,
  MemoryUsageRatio,
  ProcessCpuLimitSeconds,
  ProcessCpuUsageRatio,
  ProcessCpuSecondsTotal,
  UptimeSeconds,
} from './metrics';
import { MetricsController } from './metrics.controller';
import { AppConfigModule } from '../app-config/app-config.module';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from '../app-config/app-config.service';

@Module({
  imports: [
    PrometheusModule.register({
      path: '/self/metrics',
      defaultMetrics: {
        enabled: true,
      },
      defaultLabels: {},
    }),
    AppConfigModule,
    ConfigModule,
  ],
  providers: [
    MetricsService,
    AppConfigService,
    makeSummaryProvider(HttpRequestDurationSeconds),
    makeCounterProvider(HttpRequestCountTotal),
    makeGaugeProvider(UptimeSeconds),
    makeGaugeProvider(Build),
    makeGaugeProvider(MemoryBytes),
    makeGaugeProvider(MemoryLimitBytes),
    makeGaugeProvider(MemoryUsageRatio),
    makeGaugeProvider(ProcessCpuSecondsTotal),
    makeGaugeProvider(ProcessCpuLimitSeconds),
    makeGaugeProvider(ProcessCpuUsageRatio),
  ],
  exports: [MetricsService],
  controllers: [MetricsController],
})
export class MetricsModule {}
