import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppConfigService } from '../../app-config/app-config.service';
import { LoggerService } from '../../logger/logger.service';

// To set debug cookie open console and run command:
// javascript:document.cookie="x-debug=true"
const DEBUG_COOKIE_NAME = 'x-debug';
const DEBUG_HEADER_NAME = 'X-Debug';
const DEBUG_COOKIE_VALUE = 'true';

@Injectable()
export class DebugMiddleware implements NestMiddleware {
  constructor(
    private logger: LoggerService,
    private appConfig: AppConfigService,
  ) {
    logger.setContext(DebugMiddleware.name);
  }

  use(req: Request, res: Response, next: NextFunction) {
    if (req.cookies[DEBUG_COOKIE_NAME] === DEBUG_COOKIE_VALUE) {
      const { branch, version, chartVersion, timestamp, commit } =
        this.appConfig.getVersion();
      const header = `version=${version};chartVersion=${chartVersion};branch=${branch};timestamp=${timestamp};commit=${commit}`;
      this.logger.log(`Set header: ${DEBUG_HEADER_NAME}:${header}`);
      res.setHeader(DEBUG_HEADER_NAME, header);
    }
    next();
  }
}
