import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Summary } from 'prom-client';
import { Request, Response } from 'express';

@Injectable()
export class MetricsService {
  constructor(
    @InjectMetric('http_request_duration_seconds')
    private duration: Summary<string>,
  ) {}

  onRequest(req: Request, res: Response) {
    const { originalUrl, method } = req;
    const end = this.duration.startTimer();
    res.on('finish', () => {
      end({
        handler: originalUrl,
        method: method,
        status_code: res.statusCode,
      });
    });
  }
}
