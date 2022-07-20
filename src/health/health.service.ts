import {
  BeforeApplicationShutdown,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import {
  HealthCheckError,
  HealthCheckService,
  HealthIndicator,
  HealthIndicatorResult,
  MemoryHealthIndicator,
  HealthCheckResult,
} from '@nestjs/terminus';
import { LoggerService } from '../logger/logger.service';
import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export class HealthService
  extends HealthIndicator
  implements OnApplicationBootstrap, BeforeApplicationShutdown
{
  constructor(
    private logger: LoggerService,
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private appConfigService: AppConfigService,
  ) {
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

  getRedinessCheck(): Promise<HealthCheckResult> {
    return this.health.check([
      () =>
        this.memory.checkRSS(
          'memory_rss',
          this.appConfigService.getMemoryLimitBytes(),
        ),
      () => this.isRunning('application'),
    ]);
  }

  getLivenessCheck(): Promise<HealthCheckResult> {
    return this.health.check([]);
  }

  getStartupCheck(): Promise<HealthCheckResult> {
    return this.health.check([]);
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
