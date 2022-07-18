import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import {
  makeSummaryProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';

@Module({
  imports: [PrometheusModule.register({ path: '/self/metrics' })],
  providers: [
    MetricsService,
    makeSummaryProvider({
      name: 'hello_nest_http_request_duration_seconds',
      help: 'Http request duration in seconds',
      labelNames: ['handler', 'method', 'status_code'],
    }),
  ],
  exports: [MetricsService],
})
export class MetricsModule {}
