import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';
import { LoggerService } from '../logger/logger.service';
import { HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';
import { HealthCheckExecutor } from '@nestjs/terminus/dist/health-check/health-check-executor.service';
import { AppConfigService } from '../app-config/app-config.service';
import { ConfigService } from '@nestjs/config';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthCheckExecutor,
        HealthService,
        HealthCheckService,
        MemoryHealthIndicator,
        LoggerService,
        AppConfigService,
        ConfigService,
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
