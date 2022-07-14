import {
  BeforeApplicationShutdown,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class HealthService
  extends HealthIndicator
  implements OnApplicationBootstrap, BeforeApplicationShutdown
{
  constructor(private logger: LoggerService) {
    logger.setContext(HealthService.name);
    super();
  }
  private ready = false;

  async isRunning(key: string): Promise<HealthIndicatorResult> {
    const result = this.getStatus(key, this.ready);
    if (this.ready) {
      return result;
    }
    throw new HealthCheckError('Application is not ready', result);
  }

  onApplicationBootstrap(): any {
    this.logger.log('Application started');
    this.ready = true;
  }

  beforeApplicationShutdown(signal?: string): any {
    this.logger.log(`Application is stopping. Signal "${signal}"`);
    this.ready = false;
  }
}
