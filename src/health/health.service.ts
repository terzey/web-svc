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
import { ConfigException } from '../common/types/ConfigException';
import { ConfigService } from '@nestjs/config';

interface EnvironmentVariables {
  MEMORY_LIMIT_MB: number;
  MEMORY_THRESHOLD_PERCENT: number;
}

@Injectable()
export class HealthService
  extends HealthIndicator
  implements OnApplicationBootstrap, BeforeApplicationShutdown
{
  constructor(
    private logger: LoggerService,
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private configService: ConfigService<EnvironmentVariables>,
  ) {
    logger.setContext(HealthService.name);
    super();
  }
  private ready = false;
  private threshold: number;
  private limit: number;

  async isRunning(key: string): Promise<HealthIndicatorResult> {
    const result = this.getStatus(key, this.ready);
    if (this.ready) {
      return result;
    }
    throw new HealthCheckError('Application is not ready', result);
  }

  getRedinessCheck(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.memory.checkRSS('memory_rss', this.limit),
      () => this.memory.checkHeap('memory_heap', this.limit),
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
    this.threshold =
      this.configService.get('MEMORY_THRESHOLD_PERCENT', { infer: true }) / 100;
    if (Number.isNaN(this.threshold)) {
      throw new ConfigException(
        'Cannot read environment variable "MEMORY_THRESHOLD_PERCENT"',
      );
    }
    this.limit =
      this.threshold *
      this.configService.get('MEMORY_LIMIT_MB', { infer: true }) *
      1024 *
      1024;
    if (Number.isNaN(this.limit)) {
      throw new ConfigException(
        'Cannot read environment variable "MEMORY_LIMIT_MB"',
      );
    }
    this.ready = true;
  }

  beforeApplicationShutdown(signal?: string): any {
    this.logger.log(`Application is stopping. Signal "${signal}"`);
    this.ready = false;
  }
}
