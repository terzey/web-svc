import { Controller, Get, Head, Req } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { Request } from 'express';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get('readiness')
  @Head('readiness')
  @HealthCheck()
  async getReadinessCheck(@Req() request: Request) {
    const result = await this.healthService.getRedinessCheck();
    return request.method === 'HEAD' ? '' : result;
  }

  @Get('liveness')
  @Head('liveness')
  @HealthCheck()
  async getLivenessCheck(@Req() request: Request) {
    const result = await this.healthService.getLivenessCheck();
    return request.method === 'HEAD' ? '' : result;
  }

  @Get('startup')
  @Head('startup')
  @HealthCheck()
  async getStartupCheck(@Req() request: Request) {
    const result = await this.healthService.getStartupCheck();
    return request.method === 'HEAD' ? '' : result;
  }
}
