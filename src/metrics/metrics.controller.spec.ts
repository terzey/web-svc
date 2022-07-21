import { Test, TestingModule } from '@nestjs/testing';
import { MetricsController } from './metrics.controller';
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
  MemoryPercents,
  ProcessCpuLimitSeconds,
  ProcessCpuPercents,
  ProcessCpuSecondsTotal,
  UptimeSeconds,
  HttpRequestCountTotal,
} from './metrics';
import { AppConfigService } from '../app-config/app-config.service';
import { ConfigService } from '@nestjs/config';

describe('MetricsController', () => {
  let controller: MetricsController;

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
        makeGaugeProvider(MemoryPercents),
        makeGaugeProvider(ProcessCpuSecondsTotal),
        makeGaugeProvider(ProcessCpuLimitSeconds),
        makeGaugeProvider(ProcessCpuPercents),
      ],
      controllers: [MetricsController],
    }).compile();

    controller = module.get<MetricsController>(MetricsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
