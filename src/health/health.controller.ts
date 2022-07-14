import { Controller, Get, Head, Req } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { HealthService } from './health.service';
import { ConfigException } from '../common/types/ConfigException';

interface EnvironmentVariables {
  MEMORY_LIMIT_MB: number;
  MEMORY_THRESHOLD_PERCENT: number;
}

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private application: HealthService,
    private configService: ConfigService<EnvironmentVariables>,
  ) {}

  @Get('readiness')
  @Head('readiness')
  @HealthCheck()
  getReadinessCheck(@Req() request: Request) {
    const threshold =
      this.configService.get('MEMORY_THRESHOLD_PERCENT', { infer: true }) / 100;
    if (Number.isNaN(threshold)) {
      throw new ConfigException(
        'Cannot read environment variable "MEMORY_THRESHOLD_PERCENT"',
      );
    }
    const limit =
      threshold *
      this.configService.get('MEMORY_LIMIT_MB', { infer: true }) *
      1024 *
      1024;
    if (Number.isNaN(limit)) {
      throw new ConfigException(
        'Cannot read environment variable "MEMORY_LIMIT_MB"',
      );
    }
    const result = this.health.check([
      () => this.memory.checkRSS('memory_rss', limit),
      () => this.memory.checkHeap('memory_heap', limit),
      () => this.application.isRunning('application'),
    ]);
    return request.method === 'HEAD' ? '' : result;
  }

  @Get('liveness')
  @Head('liveness')
  @HealthCheck()
  getLivenessCheck(@Req() request: Request) {
    const result = this.health.check([]);
    return request.method === 'HEAD' ? '' : result;
  }

  @Get('startup')
  @Head('startup')
  @HealthCheck()
  getStartupCheck(@Req() request: Request) {
    return this.getLivenessCheck(request);
  }
}
