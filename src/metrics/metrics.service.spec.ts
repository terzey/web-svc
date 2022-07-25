import { Test, TestingModule } from '@nestjs/testing';
import { MetricsService } from './metrics.service';
import {
  makeGaugeProvider,
  makeSummaryProvider,
  makeCounterProvider,
} from '@willsoto/nestjs-prometheus';
import {
  Build,
  HttpRequestDurationSeconds,
  MemoryLimitBytes,
  MemoryBytes,
  MemoryUsageRatio,
  ProcessCpuLimitSeconds,
  ProcessCpuUsageRatio,
  ProcessCpuSecondsTotal,
  UptimeSeconds,
  HttpRequestCountTotal,
  Watchdog,
} from './metrics';
import { AppConfigService } from '../app-config/app-config.service';
import { ConfigService } from '@nestjs/config';

describe('MetricsService', () => {
  let service: MetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricsService,
        AppConfigService,
        ConfigService,
        makeSummaryProvider(HttpRequestDurationSeconds),
        makeCounterProvider(HttpRequestCountTotal),
        makeGaugeProvider(UptimeSeconds),
        makeGaugeProvider(Build),
        makeGaugeProvider(MemoryBytes),
        makeGaugeProvider(MemoryLimitBytes),
        makeGaugeProvider(MemoryUsageRatio),
        makeGaugeProvider(ProcessCpuSecondsTotal),
        makeGaugeProvider(ProcessCpuLimitSeconds),
        makeGaugeProvider(ProcessCpuUsageRatio),
        makeGaugeProvider(Watchdog),
      ],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
