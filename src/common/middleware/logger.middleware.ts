import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../../logger/logger.service';
import { hrtime } from 'node:process';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {
    logger.setContext(LoggerMiddleware.name);
  }

  use(req: Request, res: Response, next: NextFunction) {
    const startAt = hrtime();
    const { ip, method, originalUrl } = req;
    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const contentLength = res.get('Content-Length') || 0;
      const diff = hrtime(startAt);
      const responseTime = (diff[0] * 1e3 + diff[1] * 1e-6).toPrecision(3);
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${statusMessage} ${responseTime}ms ${contentLength}bytes - ${ip}`,
      );
    });
    next();
  }
}
