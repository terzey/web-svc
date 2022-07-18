import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { MetricsService } from '../../metrics/metrics.service';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private metricsService: MetricsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { baseUrl, method } = req;
    const end = this.metricsService.startTimer();
    res.on('finish', () => {
      end({
        handler: baseUrl,
        method: method,
        status_code: res.statusCode,
      });
    });
    next();
  }
}