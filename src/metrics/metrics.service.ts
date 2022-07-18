import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { LabelValues, Summary } from 'prom-client';

@Injectable()
export class MetricsService {
  constructor(
    @InjectMetric('hello_nest_http_request_duration_seconds')
    private duration: Summary<string>,
  ) {}

  startTimer(): (labels?: LabelValues<string>) => void {
    return this.duration.startTimer();
  }
}
