import {
  Controller,
  Get,
  Header,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { PrometheusController } from '@willsoto/nestjs-prometheus';
import { MetricsService } from './metrics.service';
import * as rawBody from 'raw-body';
import { Request, Response } from 'express';

@Controller('/self/metrics')
export class MetricsController extends PrometheusController {
  constructor(private metricsService: MetricsService) {
    super();
  }

  @Get()
  @Header('Content-Type', 'text/plain')
  @Header('Cache-Control', 'no-cache, max-age=0')
  async index(@Res() response: Response) {
    this.metricsService.observeCustomMetrics();
    await super.index(response);
  }

  @Post()
  @Header('Content-Type', 'text/plain')
  async watchdog(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const text = (await rawBody(request)).toString('utf-8');
    const modified = this.metricsService.setMetrics(text);
    response.status(modified ? HttpStatus.OK : HttpStatus.NOT_MODIFIED);
  }
}
