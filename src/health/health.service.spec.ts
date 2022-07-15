import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';
import { LoggerService } from '../logger/logger.service';
import { HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';
import { HealthCheckExecutor } from '@nestjs/terminus/dist/health-check/health-check-executor.service';

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
        ConfigService,
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
