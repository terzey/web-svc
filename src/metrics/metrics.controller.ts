import { Controller, Get, Res, Response } from '@nestjs/common';
import { PrometheusController } from '@willsoto/nestjs-prometheus';
import { MetricsService } from './metrics.service';

@Controller('/self/metrics')
export class MetricsController extends PrometheusController {
  constructor(private metricsService: MetricsService) {
    super();
  }

  @Get()
  async index(@Res() response: Response) {
    this.metricsService.observeCustomMetrics();
    await super.index(response);
  }
}
