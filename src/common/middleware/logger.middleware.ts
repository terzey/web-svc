import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {
    logger.setContext(LoggerMiddleware.name);
  }

  use(req: Request, res: Response, next: NextFunction) {
    const startAt = process.hrtime();
    const { ip, method, originalUrl } = req;
    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const contentLength = res.get('content-length');
      const diff = process.hrtime(startAt);
      const responseTime = (diff[0] * 1e3 + diff[1] * 1e-6).toPrecision(3);
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${statusMessage} ${responseTime}ms ${contentLength}bytes - ${ip}`,
      );
    });
    next();
  }
}
