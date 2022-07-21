import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { HealthService } from './health.service';

@Controller('/self/health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get('readiness')
  @HealthCheck()
  async getReadinessCheck(): Promise<HealthCheckResult> {
    return this.healthService.getRedinessCheck();
  }

  @Get('liveness')
  @HealthCheck()
  async getLivenessCheck(): Promise<HealthCheckResult> {
    return this.healthService.getLivenessCheck();
  }

  @Get('startup')
  @HealthCheck()
  async getStartupCheck(): Promise<HealthCheckResult> {
    return this.healthService.getStartupCheck();
  }
}
