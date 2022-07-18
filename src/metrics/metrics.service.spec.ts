import { Test, TestingModule } from '@nestjs/testing';
import { MetricsService } from './metrics.service';
import { makeSummaryProvider } from '@willsoto/nestjs-prometheus';

describe('MetricsService', () => {
  let service: MetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricsService,
        makeSummaryProvider({
          name: 'http_request_duration_seconds',
          help: 'Http request duration in seconds',
          labelNames: ['handler', 'method', 'status_code'],
        }),
      ],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
